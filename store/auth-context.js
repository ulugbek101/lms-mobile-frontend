import { createContext, useState } from "react";
import { navigate } from "../helpers/navigation";

export const AuthContext = createContext({
	authTokens: null,
	user: null,
	login: async () => {},
	logout: () => {},
});

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [authTokens, setAuthTokens] = useState(null);

	function login(email, password) {
		setAuthTokens("token");
		navigate("authStack", null, true);
	}

	function logout() {
		setUser(null);
		setAuthTokens(null);
		navigate("login", null, true);
	}

	const value = {
		authTokens,
		user,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
