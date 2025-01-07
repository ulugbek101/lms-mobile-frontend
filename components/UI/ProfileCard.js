import { StyleSheet, View } from "react-native";

function ProfileCard({ children, style }) {
	return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		// borderWidth: 1,
		borderColor: "#c1c1c1",
		borderRadius: 8,
		backgroundColor: "#fff",
		// Android shadow
		elevation: 4,
		// iOS shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3.5,
	},
});

export default ProfileCard;
