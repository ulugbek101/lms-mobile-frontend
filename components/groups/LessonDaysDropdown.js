import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
	{ label: "Dush, Chor, Jum", value: "1-3-5" },
	{ label: "Sesh, Pay, Shan", value: "2-4-6" },
];

const LessonDaysDropdown = ({ setState }) => {
	const [value, setValue] = useState(null);
	const [open, setOpen] = useState(false);

	const renderLabel = () => {
		if (value || open) {
			return (
				<Text style={[styles.label, open && { color: "#007BFF" }]}>
					Dars kunlari
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
				]}
				iconStyle={[styles.iconStyle, open && { tintColor: "#007BFF" }]}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!open ? "Dars kunlari" : ""}
				value={value}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				onChange={item => {
					setValue(item.value); // Update the local state of the dropdown
					setState(item.value); // Update the parent state
					setOpen(false);
				}}
				renderLeftIcon={() => (
					<AntDesign
						style={styles.icon}
						color={open ? "#007BFF" : value ? "black" : "#00000070"}
						name="calendar"
						size={20}
					/>
				)}
			/>
		</View>
	);
};

export default LessonDaysDropdown;

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
