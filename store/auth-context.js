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
	const storedTokens = await AsyncStorage.getItem("authTokens");

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
		const fetchTokens = async () => {
			const storedTokens = await getTokensFromAsyncStorage();
			if (storedTokens) {
				setAuthTokens(storedTokens);
				setUser(getUserFromAuthTokens(storedTokens));
			}
		};

		fetchTokens();
	}, []);

	// Persist authTokens to AsyncStorage whenever they change
	useEffect(() => {
		if (authTokens) {
			AsyncStorage.setItem("authTokens", JSON.stringify(authTokens));
		}
	}, [authTokens]);

	// Login function
	async function login(email, password) {
		try {
			const response = await axios.post(`${baseURL}/api/v1/token/`, {
				email,
				password,
			});

			// Set authTokens and user data
			setAuthTokens(response.data);
			setUser(jwtDecode(response.data.access)); // Corrected typo here
			navigate("authStack", null, true);
			setLoginError(null); // Reset any previous errors on successful login
		} catch (error) {
			console.error("Error while authenticating:", error);
			setLoginError("Invalid credentials or network error"); // Set error message for UI
		}
	}

	// Logout function
	function logout() {
		setUser(null);
		setAuthTokens(null);
		AsyncStorage.removeItem("authTokens"); // Optionally clear tokens on logout
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
