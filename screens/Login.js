import { useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	Keyboard,
	StyleSheet,
	View,
} from "react-native";
import loginBg from "../assets/images/login-bg.jpg";
import logo from "../assets/images/logo.jpg";
import Button from "../components/Button"; // Assuming the Button component is in the components folder
import Input from "../components/Input"; // Assuming the Input component is in the components folder

function Login({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	// Email validation function
	const validateEmail = email => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!email || !emailRegex.test(email)) {
			return false;
		}
		return true;
	};

	// Password validation function
	const validatePassword = password => {
		if (!password || password.length < 1) {
			return false;
		}
		return true;
	};

	// Handle form submission
	const handleLogin = () => {
		const emailValid = validateEmail(email);
		const passwordValid = validatePassword(password);

		if (emailValid && passwordValid) {
			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false);
				console.log("Login successful:", { email, password });
			}, 2000);
			Keyboard.dismiss();
		}
	};

	// Check if the form is valid (email and password)
	useEffect(() => {
		const emailValid = validateEmail(email);
		const passwordValid = validatePassword(password);
		setFormIsValid(emailValid && passwordValid);
	}, [email, password]);

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
				/>
				<Input
					placeholder="Parol"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<Button
					isLoading={isLoading}
					formIsValid={formIsValid}
					handlePress={handleLogin}
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
