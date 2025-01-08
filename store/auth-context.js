import AsyncStorage from "@react-native-async-storage/async-storage"; // Corrected import
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { baseURL } from "../constants";
import { navigate } from "../helpers/navigation";

// Context initialization
export const AuthContext = createContext({
	authTokens: null,
	user: null,
	login: async () => {},
	logout: () => {},
	setUser: () => {},
	setAuthTokens: () => {},
});

// Helper function to get tokens from AsyncStorage
async function getTokensFromAsyncStorage() {
	const storedTokens = await AsyncStorage.getItem("ModminAuthTokens");

	try {
		return JSON.parse(storedTokens);
	} catch (error) {
		console.error("Error fetching tokens from AsyncStorage:", error);
		return null;
	}
}

// Helper function to get user data from auth tokens
function getUserFromAuthTokens(authTokens) {
	if (authTokens && authTokens.access) {
		try {
			return jwtDecode(authTokens.access); // Decode user from access token
		} catch (error) {
			console.error("Error parsing user from authTokens:", error);
			return null;
		}
	}
	return null;
}

// AuthContext provider
function AuthContextProvider({ children }) {
	const [authTokens, setAuthTokens] = useState(null);
	const [user, setUser] = useState(null);
	const [loginError, setLoginError] = useState(null); // To store login errors

	// Fetch tokens and user data from AsyncStorage on mount
	useEffect(() => {
		async function fetchTokens() {
			try {
				const storedTokens = await AsyncStorage.getItem("ModminAuthTokens");
				const storedUser = await AsyncStorage.getItem("ModminUser");

				if (storedTokens) {
					setAuthTokens(JSON.parse(storedTokens));
					setUser(
						storedUser
							? JSON.parse(storedUser)
							: getUserFromAuthTokens(JSON.parse(storedTokens))
					);
				}
			} catch (error) {
				console.error(
					"Error fetching tokens or user from AsyncStorage:",
					error
				);
			}
		}

		fetchTokens();
	}, []);

	// Persist authTokens to AsyncStorage whenever they change
	useEffect(() => {
		if (authTokens) {
			AsyncStorage.setItem("ModminAuthTokens", JSON.stringify(authTokens));
			AsyncStorage.setItem("ModminUser", JSON.stringify(user)); // Store user
		}
	}, [authTokens, user]);

	async function login(email, password) {
		try {
			const response = await axios.post(`${baseURL}/token/`, {
				email,
				password,
			});
			const decodedUser = jwtDecode(response.data.access);

			// Set authTokens and user data
			setAuthTokens(response.data);
			setUser(decodedUser);

			// Persist immediately after setting states
			await AsyncStorage.setItem(
				"ModminAuthTokens",
				JSON.stringify(response.data)
			);
			await AsyncStorage.setItem("ModminUser", JSON.stringify(decodedUser));

			setLoginError(null); // Clear any error
			navigate("authStack", null, true); // Redirect
		} catch (error) {
			console.error("Error while authenticating:", error);
			setLoginError("Invalid credentials or network error");
		}
	}

	// Logout function
	function logout() {
		setUser(null);
		setAuthTokens(null);
		AsyncStorage.removeItem("ModminAuthTokens");
		AsyncStorage.removeItem("ModminUser"); // Clear stored user
		navigate("login", null, true);
	}

	const value = {
		authTokens,
		user,
		login,
		logout,
		setUser,
		setAuthTokens,
		loginError, // Include loginError in context to show in UI
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
