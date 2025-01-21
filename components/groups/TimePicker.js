import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = ({ label, value, onChange }) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleConfirm = date => {
		const timeString = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		onChange(timeString);
		setIsVisible(false);
	};

	const handleCancel = () => {
		setIsVisible(false);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.timeContainer}>
				<Text style={styles.timeText}>{value || "Vaqtni tanlang"}</Text>
				<AntDesign
					name="clockcircleo"
					size={20}
					color="#007BFF"
					onPress={() => setIsVisible(true)}
				/>
			</View>

			<DateTimePickerModal
				isVisible={isVisible}
				mode="time"
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</View>
	);
};

export default TimePicker;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingVertical: 0,
		width: "100%",
	},
	label: {
		fontSize: 14,
		color: "#00000070",
		marginBottom: 5,
	},
	timeContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#E9ECEF",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 12,
	},
	timeText: {
		fontSize: 16,
		color: "#00000070",
	},
});
