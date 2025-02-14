import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import ProfileCard from "../components/UI/ProfileCard";
import ProfileCardTitle from "../components/UI/ProfileCardTitle";
import { baseURL } from "../constants";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../store/auth-context";

function Profile() {
	const { user, setUser } = useContext(AuthContext);
	const axiosInstance = useAxios();
	const [firstName, setFirstName] = useState(user?.first_name);
	const [lastName, setLastName] = useState(user?.last_name);
	const [email, setEmail] = useState(user?.email);
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [userInfoUpdateLoading, setUserInfoUpdateLoading] = useState(false);
	const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
	const [passwordsAreValid, setPasswordsAreValid] = useState(false);
	const [userInfoIsValid, setUserInfoIsValid] = useState(false);

	useEffect(() => {
		setPasswordsAreValid(password1 === password2 && password2.length >= 8);
		setUserInfoIsValid(
			firstName &&
				lastName &&
				email &&
				firstName.trim().length >= 3 &&
				lastName.trim().length >= 3 &&
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
		);
	}, [password1, password2, firstName, lastName, email]);

	async function updateUserInformation() {
		setUserInfoUpdateLoading(true);

		try {
			const response = await axiosInstance.patch(
				`${baseURL}/users/${user.id}/`,
				{
					first_name: firstName,
					last_name: lastName,
					email: email,
				}
			);

			setUser(response.data);
			await AsyncStorage.setItem("ModminUser", JSON.stringify(response.data));

			Toast.show({
				type: "success",
				text1: "Shaxsiy ma'lumotlaringiz yangilandi",
			});
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Shaxsiy ma'lumotlarni yangilashda xatolik yuz berdi",
				text2: `${error}`,
			});
			console.error(error);
		} finally {
			setUserInfoUpdateLoading(false);
		}
	}

	async function updateUserPassword() {
		try {
			setPasswordUpdateLoading(true);
			await axiosInstance.patch(`${baseURL}/users/${user.id}/`, {
				password: password2,
			});
			Toast.show({
				type: "success",
				text1: "Parol muvaffaqiyatli yangilandi",
			});
			setPassword1("");
			setPassword2("");
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Parolni yangilashda xatolik yuz berdi",
				text2: `${error}`,
			});
			console.error(error);
		} finally {
			setPasswordUpdateLoading(false);
		}
	}

	return (
		<Container>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					enableOnAndroid={true}
					extraScrollHeight={50} // Adjust scrolling to ensure visibility
				>
					<ScrollView>
						<View style={styles.profileImageContainer}>
							<Image
								style={styles.profileImage}
								source={require("../assets/images/logo.jpg")}
							/>
						</View>

						<ProfileCard style={{ marginTop: 20 }}>
							<View style={styles.userInfoContainer}>
								<View style={styles.cardHeader}>
									<FontAwesome name="user" size={30} color="#00000070" />
									<ProfileCardTitle title="Shaxsiy ma'lumotlar" />
								</View>
								<Input
									placeholder="Ism"
									style={styles.input}
									placeholderTextColor="#00000070"
									value={firstName}
									onChangeText={value => setFirstName(value)}
								/>
								<Input
									placeholder="Familiya"
									style={styles.input}
									placeholderTextColor="#00000070"
									value={lastName}
									onChangeText={value => setLastName(value)}
								/>
								<Input
									placeholder="E-mail manzil"
									keyboardType="email-address"
									style={styles.input}
									placeholderTextColor="#00000070"
									value={email}
									onChangeText={value => setEmail(value)}
								/>
								<Button
									handlePress={updateUserInformation}
									buttonText="Ma'lumotlarni saqlash"
									buttonWidth="100%"
									bgColor="#000000d8"
									disabledBgColor="#00000070"
									isLoading={userInfoUpdateLoading}
									disabled={!userInfoUpdateLoading && !userInfoIsValid}
								/>
							</View>
						</ProfileCard>

						<ProfileCard style={{ marginTop: 20 }}>
							<View style={styles.userInfoContainer}>
								<View style={styles.cardHeader}>
									<FontAwesome name="lock" size={30} color="#00000070" />
									<ProfileCardTitle title="Parol" />
								</View>
								<Input
									placeholder="Parol"
									style={styles.input}
									placeholderTextColor="#00000070"
									value={password1}
									secureTextEntry={true}
									onChangeText={value => setPassword1(value)}
								/>
								<Input
									placeholder="Parolni takrorlang"
									style={styles.input}
									placeholderTextColor="#00000070"
									value={password2}
									secureTextEntry={true}
									onChangeText={value => setPassword2(value)}
								/>
								<Button
									handlePress={updateUserPassword}
									buttonText="Parolni yangilash"
									buttonWidth="100%"
									bgColor="#000000d8"
									disabledBgColor="#00000070"
									isLoading={passwordUpdateLoading}
									disabled={!passwordUpdateLoading && !passwordsAreValid}
								/>
							</View>
						</ProfileCard>
					</ScrollView>
				</KeyboardAwareScrollView>
			</KeyboardAvoidingView>
		</Container>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	profileImageContainer: {
		alignItems: "center",
	},
	userInfoContainer: {
		gap: 10,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		gap: 15, // Add spacing between the icon and the title
	},
	input: {
		borderColor: "#c1c1c1",
		color: "#000000a7",
		width: "100%",
	},
});

export default Profile;
