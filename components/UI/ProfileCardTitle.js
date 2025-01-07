import { StyleSheet, Text } from "react-native";

function ProfileCardTitle({ children }) {
	return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000000a7",
	},
});

export default ProfileCardTitle;
