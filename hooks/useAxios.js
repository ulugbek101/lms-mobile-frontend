import { useContext } from "react";

import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { baseURL } from "../constants";
import { navigate } from "../helpers/navigation";
import { AuthContext } from "../store/auth-context";

function useAxios() {
	const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

	const axiosInstance = axios.create({
		baseURL,
		headers: { Authorization: `Bearer ${authTokens?.access}` },
	});

	axiosInstance.interceptors.request.use(async req => {
		if (!authTokens?.refresh) return req;

		const user = authTokens?.access ? jwtDecode(authTokens.access) : null;

		const isExpired = user?.exp
			? dayjs.unix(user.exp).isBefore(dayjs())
			: false;

		if (!isExpired) return req;

		try {
			const response = await axios.post(`${baseURL}/token/refresh/`, {
				refresh: authTokens.refresh,
			});

			const newAuthTokens = response.data;

			// Update local storage and state with new tokens
			await AsyncStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
			setAuthTokens(newAuthTokens);
			setUser(jwtDecode(newAuthTokens.access));

			req.headers.Authorization = `Bearer ${newAuthTokens.access}`;
		} catch (error) {
			console.error("Token refresh failed:", error);

			// Clear state and local storage if refresh fails
			setAuthTokens(null);
			setUser(null);
			await AsyncStorage.removeItem("authTokens");
			Toast.show({
				type: "error",
				text1: "Sessiya vaqti tugagan, tizimga qayta kirish talab etiladi",
			});
			navigate("login", null, true);
		}

		return req;
	});

	return axiosInstance;
}

export default useAxios;
