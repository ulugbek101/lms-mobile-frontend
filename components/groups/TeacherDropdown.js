import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import useAxios from "../../hooks/useAxios";

const TeacherDropdown = ({ onTeacherSelect }) => {
	const [teachers, setTeachers] = useState([]);
	const [value, setValue] = useState(null);
	const [open, setOpen] = useState(false);
	const axiosInstance = useAxios();

	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const response = await axiosInstance.get("/teachers/");
				const formattedTeachers = response.data.map(teacher => ({
					label: `${teacher.first_name} ${teacher.last_name}`,
					value: String(teacher.id), // Ensure value is a string
				}));
				setTeachers(formattedTeachers);
			} catch (error) {
				console.error("Error fetching teachers", error);
			}
		};
		fetchTeachers();
	}, []);

	const renderLabel = () => {
		if (value || open) {
			return (
				<Text style={[styles.label, open && { color: "#007BFF" }]}>
					Ustozlar
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
				data={teachers}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!open ? "Ustoz" : ""}
				value={value}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				onChange={item => {
					setValue(item.value);
					setOpen(false);
					onTeacherSelect(item.value); // Notify parent of selection
				}}
				renderLeftIcon={() => (
					<AntDesign
						style={styles.icon}
						color={open ? "#007BFF" : value ? "black" : "#00000070"}
						name="user"
						size={20}
					/>
				)}
			/>
		</View>
	);
};

export default TeacherDropdown;

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
});
