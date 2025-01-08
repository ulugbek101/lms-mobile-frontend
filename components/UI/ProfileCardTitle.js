import { StyleSheet, Text } from "react-native";

function ProfileCardTitle({ title }) {
	return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000000a7",
	},
});

export default ProfileCardTitle;
