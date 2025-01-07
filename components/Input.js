import React, { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = forwardRef((props, ref) => {
	const {
		placeholder,
		placeholderTextColor = "#ffffff",
		keyboardType = "default",
		secureTextEntry = false,
		style,
		...rest
	} = props;

	return (
		<TextInput
			ref={ref}
			style={[styles.input, style]}
			placeholder={placeholder}
			placeholderTextColor={placeholderTextColor}
			keyboardType={keyboardType}
			secureTextEntry={secureTextEntry}
			{...rest}
		/>
	);
});

const styles = StyleSheet.create({
	input: {
		width: 300,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 4,
		borderColor: "#ffffff",
		borderWidth: 2,
		fontSize: 16,
		color: "#ffffff",
		fontWeight: "bold",
	},
});

export default Input;
