import React, { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = forwardRef(
	(
		{
			placeholder,
			placeholderTextColor = "#ffffff",
			keyboardType = "default",
			secureTextEntry = false,
			autoCapitalize = "none",
			autoCorrect = false,
			autoFocus = false,
			autoComplete = "off",
			style,
			...rest
		},
		ref
	) => {
		return (
			<TextInput
				ref={ref}
				style={[styles.input, style]} // Combine styles
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				autoCapitalize={autoCapitalize}
				autoCorrect={autoCorrect}
				autoFocus={autoFocus}
				autoComplete={autoComplete}
				{...rest} // Spread any other props (like onChangeText, value, etc.)
			/>
		);
	}
);

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
