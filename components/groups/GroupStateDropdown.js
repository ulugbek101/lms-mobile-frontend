import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
	{ label: "Faol", value: true },
	{ label: "Nofaol", value: false },
];

const GroupStateDropdown = () => {
	const [value, setValue] = useState(null);
	const [open, setOpen] = useState(false);

	const renderLabel = () => {
		if (value != null || open) {
			return (
				<Text style={[styles.label, open && { color: "#007BFF" }]}>
					Faollik statusi
				</Text>
			);
		}
		return null;
	};

	return (
		<View style={styles.container}>
			{renderLabel()}
			<Dropdown
				style={[styles.dropdown, open && { borderColor: "#007BFF" }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={[
					styles.selectedTextStyle,
					open && { color: "#007BFF" },
					{ color: value ? "green" : "red" },
				]}
				iconStyle={[styles.iconStyle, open && { tintColor: "#007BFF" }]}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!open ? "Faoolik statusi" : ""}
				value={value}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				onChange={item => {
					setValue(item.value);
					setOpen(false);
				}}
				renderLeftIcon={() => (
					<AntDesign
						style={styles.icon}
						color={
							value === true
								? "green"
								: value === false
								? "red"
								: value === null && open
								? "#007BFF"
								: "#00000070"
						}
						name="Safety"
						size={20}
					/>
				)}
			/>
		</View>
	);
};

export default GroupStateDropdown;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingVertical: 16,
		width: "100%",
	},
	dropdown: {
		height: 50,
		borderColor: "#E9ECEF",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 10,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 30,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
		color: "#00000070",
	},
	placeholderStyle: {
		fontSize: 14,
		color: "#00000070",
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
