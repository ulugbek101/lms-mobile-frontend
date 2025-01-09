import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SubjectTableItem = ({ index, item, onEdit, onDelete }) => {
	return (
		<View style={styles.subjectItem}>
			<Text style={styles.subjectNumber}>{index + 1}.</Text>

			{/* Scrollable subject name */}
			<View style={styles.subjectTextContainer}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<Text style={styles.subjectText}>{item.name}</Text>
				</ScrollView>
			</View>

			<Text style={styles.groupText}>{item.groups}</Text>
			<Text style={styles.studentText}>{item.students}</Text>
			<View style={styles.actions}>
				<TouchableOpacity
					style={styles.actionButton}
					onPress={() => onEdit(item)}
				>
					<MaterialIcons name="edit" size={24} color="#007BFF" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.actionButton}
					onPress={() => onDelete(item.id)}
				>
					<MaterialIcons name="delete" size={24} color="#FF0000" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	subjectItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#F8F9FA",
		borderRadius: 8,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#E9ECEF",
	},
	subjectNumber: {
		width: 25,
		textAlign: "center",
		fontSize: 16,
		color: "#212529",
	},
	subjectTextContainer: {
		flex: 1,
	},
	subjectText: {
		fontSize: 16,
		color: "#212529",
		marginLeft: 10,
	},
	groupText: {
		width: 80,
		textAlign: "center",
		fontSize: 14,
		color: "#6C757D",
	},
	studentText: {
		width: 80,
		textAlign: "center",
		fontSize: 14,
		color: "#6C757D",
	},
	actions: {
		flexDirection: "row",
		width: 80,
		justifyContent: "space-around",
	},
	actionButton: {
		marginLeft: 0,
	},
});

export default SubjectTableItem;
