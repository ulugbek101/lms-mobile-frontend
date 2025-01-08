import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for the user icon
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import ProfileCard from "../components/UI/ProfileCard";
import ProfileCardTitle from "../components/UI/ProfileCardTitle";

function Profile({ navigation }) {
	const [firstName, setFirstName] = useState("Ulug'bek");
	const [lastName, setLastName] = useState("Umaraliyev");
	const [email, setEmail] = useState("thedevu101@gmail.com");

	useEffect(() => {
		navigation.setOptions({
			title: "Shaxsiy kabinet",
			headerTitleAlign: "center",
			headerTitleStyle: {
				fontSize: 18,
				fontWeight: "bold",
			},
			headerBackTitle: "Orqaga",
		});
	}, []);

	return (
		<Container>
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
						buttonText="Ma'lumotlarni saqlash"
						buttonWidth="100%"
						bgColor="#000000d8"
					/>
				</View>
			</ProfileCard>
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
