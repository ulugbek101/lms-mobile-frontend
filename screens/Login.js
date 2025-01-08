import { useContext, useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	Keyboard,
	StyleSheet,
	View,
} from "react-native";
import loginBg from "../assets/images/login-bg.jpg";
import logo from "../assets/images/logo.jpg";
import Button from "../components/UI/Button"; // Assuming the Button component is in the components folder
import Input from "../components/UI/Input"; // Assuming the Input component is in the components folder
import { navigate } from "../helpers/navigation";
import { AuthContext } from "../store/auth-context";

function Login({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formIsValid, setFormIsValid] = useState(true);
	const { login, user } = useContext(AuthContext);

	// Redirect if the user is already logged in
	useEffect(() => {
		if (user) {
			navigate("authStack", null, true); // Navigate directly to authStack if user is logged in
		}
	}, [user]);

	// Handle login form validation
	useEffect(() => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		setFormIsValid(
			email && emailRegex.test(email) && password && password.length >= 1
		);
	}, [email, password]);

	// Handle the login action
	async function handleLogin() {
		if (formIsValid) {
			setIsLoading(true);
			try {
				await login(email, password);
			} catch (error) {
				console.error("An error occurred while logging in");
				console.error(error);
			} finally {
				setIsLoading(false);
			}
			Keyboard.dismiss();
		}
	}

	// If user is logged in, don't render login screen, otherwise show login form
	if (user) {
		return null; // Prevent rendering the login screen if user is already logged in
	}

	return (
		<ImageBackground source={loginBg} style={styles.container}>
			<View style={styles.loginForm}>
				<View style={styles.logoWrapper}>
					<Image style={styles.logo} source={logo} />
				</View>
				<Input
					placeholder="E-mail manzil"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
					autoFocus={true}
				/>
				<Input
					placeholder="Parol"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<Button
					isLoading={isLoading}
					disabled={!formIsValid}
					handlePress={handleLogin}
					buttonText="Tizimga kirish"
				/>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		resizeMode: "cover",
	},
	loginForm: {
		marginTop: "50%",
		gap: 10,
		alignItems: "center",
	},
	logoWrapper: {
		alignItems: "center",
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
});

export default Login;
