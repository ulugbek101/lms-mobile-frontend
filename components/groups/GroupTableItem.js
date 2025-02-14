import React, { useEffect, useState } from "react";
import {
	BackHandler,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { lessonDays } from "../../constants";
import Modal from "../UI/Modal";

const GroupTableItem = ({ index, item, onEdit, onDelete }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false); // Modal for delete confirmation

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const toggleDeleteModal = () => {
		setDeleteModalVisible(!isDeleteModalVisible);
	};

	// Handle Android back button to close the modal
	useEffect(() => {
		const backAction = () => {
			if (isModalVisible || isDeleteModalVisible) {
				setModalVisible(false);
				setDeleteModalVisible(false);
				return true;
			}
			return false;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove(); // Cleanup on unmount
	}, [isModalVisible, isDeleteModalVisible]);

	// Format date to dd.mm.yyyy
	const formatDate = date => {
		const d = new Date(date);
		const day = String(d.getDate()).padStart(2, "0");
		const month = String(d.getMonth() + 1).padStart(2, "0");
		const year = d.getFullYear();
		return `${day}.${month}.${year}`;
	};

	return (
		<>
			<TouchableOpacity onLongPress={toggleModal}>
				<View style={styles.groupItem}>
					<Text style={styles.groupNumber}>{index + 1}.</Text>
					<View style={styles.groupTextContainer}>
						<Text style={styles.groupText}>{item.name}</Text>
					</View>
					<View style={styles.groupTextContainer}>
						<Text style={styles.teacherText}>
							{item.teacher.first_name} {item.teacher.last_name}
						</Text>
					</View>
					<View style={styles.actions}>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={() => onEdit(item)}
						>
							<MaterialIcons name="edit" size={24} color="#007BFF" />
						</TouchableOpacity>
						<TouchableOpacity
							disabled={Number(item.students) > 0}
							style={styles.actionButton}
							onPress={toggleDeleteModal} // Show delete confirmation modal
						>
							<MaterialIcons
								name="delete"
								size={24}
								color={Number(item.students) > 0 ? "#00000070" : "#FF0000"}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>

			{/* Modal for group details */}
			<Modal
				isVisible={isModalVisible}
				onCancel={toggleModal}
				onSave={() => {}}
				saveButtonText="Save" // If needed
				cancelButtonText="Close"
			>
				<Text style={styles.modalTitle}>Guruh ma'lumotlari</Text>
				{[
					["Nomi", item.name],
					[
						"O'qituvchisi",
						`${item.teacher.first_name} ${item.teacher.last_name}`,
					],
					["O'quvchilar soni", `${item.students} ta`],
					["Yaratilgan sana", formatDate(item.created)],
					["Yangilangan sana", formatDate(item.updated)],
					["Dars kunlari", lessonDays[item.lesson_days]],
					["O'qish boshlanish sanasi", formatDate(item.start_date)],
					["O'qish tugash sanasi", formatDate(item.end_date)],
					[
						"Holati",
						<Text
							style={{
								color: item.is_active ? "green" : "red",
							}}
						>
							{item.is_active ? "Faol" : "Nofaol"}
						</Text>,
					],
				].map(([label, value], idx) => (
					<View style={styles.modalRow} key={idx}>
						<Text style={styles.modalLabel}>{label}</Text>
						<Text style={styles.modalValue}>{value}</Text>
					</View>
				))}
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal
				isVisible={isDeleteModalVisible}
				onCancel={toggleDeleteModal}
				onSave={onDelete.bind(null, item.id)}
				saveButtonText="Ha"
				cancelButtonText="Yo'q"
			>
				<Text style={styles.confirmDeleteTitle}>
					"{item.name}" guruhini o'chirishni tasdiqlaysizmi?
				</Text>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	groupItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 5,
		backgroundColor: "#F8F9FA",
		borderRadius: 8,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#E9ECEF",
	},
	groupNumber: {
		width: 25,
		textAlign: "center",
		fontSize: 16,
		color: "#212529",
	},
	groupTextContainer: {
		flex: 1,
	},
	groupText: {
		fontSize: 14,
		color: "#212529",
		marginLeft: 10,
	},
	teacherText: {
		fontSize: 14,
		color: "#6C757D",
		textAlign: "center",
	},
	actions: {
		flexDirection: "row",
		width: 80,
		justifyContent: "space-around",
	},
	actionButton: {
		marginLeft: 0,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#212529",
	},
	modalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#E9ECEF",
		paddingVertical: 4,
	},
	modalLabel: {
		fontSize: 16,
		color: "#495057",
	},
	modalValue: {
		fontSize: 16,
		color: "#212529",
		textAlign: "right",
	},
	confirmDeleteTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 20,
	},
});

export default GroupTableItem;
