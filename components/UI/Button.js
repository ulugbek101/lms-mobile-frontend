import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

const Button = ({
	isLoading,
	buttonText,
	handlePress,
	disabled = false,
	buttonHeight = 50,
	indicatorSize = "small",
	buttonTextSize = 16,
	bgColor = "rgba(0, 0, 0, 0.8)",
	disabledBgColor = "rgba(0, 0, 0, 0.4)",
	disabledOpacity = 0.5,
	buttonWidth = 300,
}) => {
	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => [
				pressed && { opacity: 0.8 },
				styles.button,
				{
					height: buttonHeight,
					backgroundColor: disabled ? disabledBgColor : bgColor, // Simplified ternary
					width: buttonWidth,
				},
				disabled && { opacity: disabledOpacity }, // Apply opacity if disabled
			]}
			disabled={disabled} // Disable the button if form is invalid
		>
			{isLoading ? (
				<ActivityIndicator size={indicatorSize} color="#ffffff" />
			) : (
				<Text style={[styles.buttonText, { fontSize: buttonTextSize }]}>
					{buttonText}
				</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		paddingHorizontal: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "#ffffff",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default Button;
