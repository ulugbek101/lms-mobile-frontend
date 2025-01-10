import DatePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import GroupStateDropdown from "../components/groups/GroupStateDropdown";
import GroupsTable from "../components/groups/GroupTable";
import LessonDaysDropdown from "../components/groups/LessonDaysDropdown";
import TeacherDropdown from "../components/groups/TeacherDropdown";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import useAxios from "../hooks/useAxios";

function Groups() {
	const [groups, setGroups] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isActionLoading, setIsActionLoading] = useState(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [editedName, setEditedName] = useState("");
	const [newGroupName, setNewGroupName] = useState("");
	const [lessonDaysSelected, setLessonDays] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [state, setState] = useState(null);
	const [selectedTeacherId, setSelectedTeacherId] = useState(null);
	const [validationError, setValidationError] = useState("");
	const axiosInstance = useAxios();

	// Function to fetch groups from the server
	const fetchGroups = async () => {
		setIsLoading(true);
		try {
			const response = await axiosInstance.get("/groups/");
			setGroups(response.data);
		} catch (error) {
			let errorMessage = "An error occurred";
			if (!error.response) {
				errorMessage = "Internetga bog'lanish mavjud emas";
			} else if (error.response.status === 500) {
				errorMessage = "Server xatoligi, iltimos keyinroq urinib ko'ring";
			} else if (error.response.status === 404) {
				errorMessage = "Guruhlar topilmadi!";
			}
			console.error("Error while fetching groups", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchGroups();
	}, []);

	const handleEdit = group => {
		setSelectedGroup(group);
		setEditedName(group.name);
		setIsEditModalVisible(true);
	};

	const handleSaveEdit = async () => {
		setIsActionLoading(true);
		try {
			await axiosInstance.patch(`/groups/${selectedGroup.id}/`, {
				name: editedName,
			});
			fetchGroups();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				Toast.show({
					type: "error",
					position: "top",
					text1: "Guruh nomini yangilashda xatolik",
					text2: "Bunday nomli guruh allaqachon mavjud",
				});
			}
			console.log("Error while saving group", error);
		} finally {
			setIsActionLoading(false);
			setIsEditModalVisible(false);
			setSelectedGroup(null);
		}
	};

	const handleDelete = async id => {
		setIsActionLoading(true);
		try {
			await axiosInstance.delete(`/groups/${id}/`);
			fetchGroups();
		} catch (error) {
			Toast.show({
				type: "error",
				position: "top",
				text1: "Guruh o'chirishda xatolik",
				text2: "Server xatoligi, iltimos keyinroq urinib ko'ring",
			});
			console.log("Error while deleting group", error);
		} finally {
			setIsActionLoading(false);
		}
	};

	const handleCancelEdit = () => {
		setIsEditModalVisible(false);
		setSelectedGroup(null);
		setEditedName("");
	};

	const handleAddNewGroup = () => {
		setNewGroupName("");
		setLessonDays("");
		setStartDate(new Date());
		setEndDate(new Date());
		setState(null);
		setSelectedTeacherId(null);
		setIsAddModalVisible(true);
	};

	const handleSaveNewGroup = async () => {
		if (
			!newGroupName ||
			!selectedTeacherId ||
			!lessonDaysSelected ||
			!startDate ||
			!endDate ||
			state === null
		) {
			setValidationError("Iltimos, barcha sohalarni to'ldiring");
			return;
		}
		setValidationError("");
		setIsActionLoading(true);
		try {
			await axiosInstance.post("/groups/", {
				name: newGroupName,
				teacher: selectedTeacherId,
				lesson_days: lessonDaysSelected,
				start_date: startDate,
				end_date: endDate,
				state,
			});
			fetchGroups();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				Toast.show({
					type: "error",
					position: "top",
					text1: "Error adding group",
					text2: "Group with this name already exists",
				});
			}
			console.error("Error while adding group", error);
		} finally {
			setIsActionLoading(false);
			setIsAddModalVisible(false);
		}
	};

	const handleCancelAdd = () => {
		setIsAddModalVisible(false);
		setValidationError("");
	};

	return (
		<View style={styles.container}>
			<View style={styles.addGroupButtonContainer}>
				<Button
					buttonText="Guruh qo'shish"
					buttonHeight={30}
					buttonWidth="45%"
					handlePress={handleAddNewGroup}
				/>
			</View>

			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#007BFF" />
				</View>
			) : (
				<GroupsTable
					groups={groups}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			{isActionLoading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#007BFF" />
				</View>
			)}

			{isAddModalVisible && (
				<Modal
					isVisible={isAddModalVisible}
					onCancel={handleCancelAdd}
					onSave={handleSaveNewGroup}
					saveButtonText="Qo'shish"
					cancelButtonText="Bekor qilish"
				>
					<View style={styles.fields}>
						<Text style={styles.modalHeader}>Yangi guruh qo'shish</Text>

						<TeacherDropdown onTeacherSelect={setSelectedTeacherId} />

						<TextInput
							placeholderTextColor="#00000070"
							style={styles.input}
							placeholder="Guruh nomi"
							value={newGroupName}
							onChangeText={setNewGroupName}
						/>

						{/* Start and End Date Picker */}
						<View style={styles.datePickers}>
							<View style={styles.datePickerContainer}>
								<Text>O'qish bosh. sanasi:</Text>
								<DatePicker
									style={styles.datePicker}
									value={startDate}
									mode="date"
									display="default"
									onChange={(event, selectedDate) =>
										setStartDate(selectedDate || startDate)
									}
								/>
							</View>
							<View style={styles.datePickerContainer}>
								<Text>O'qish tugash sanasi:</Text>
								<DatePicker
									style={styles.datePicker}
									value={endDate}
									mode="date"
									display="default"
									onChange={(event, selectedDate) =>
										setEndDate(selectedDate || endDate)
									}
								/>
							</View>
						</View>

						<LessonDaysDropdown
							lessonDaysSelected={lessonDaysSelected}
							setLessonDays={setLessonDays}
						/>

						<GroupStateDropdown />
					</View>

					{validationError && (
						<Text style={styles.validationError}>{validationError}</Text>
					)}
				</Modal>
			)}

			{isEditModalVisible && (
				<Modal
					isVisible={isEditModalVisible}
					onCancel={handleCancelEdit}
					onSave={handleSaveEdit}
					saveButtonText="Saqlash"
					cancelButtonText="Bekor qilish"
				>
					<Text style={styles.modalHeader}>Guruh nomini o'zgartirish</Text>
					<TextInput
						autoFocus
						style={styles.input}
						value={editedName}
						onChangeText={setEditedName}
					/>
				</Modal>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	fields: {
		gap: 20,
	},
	datePickers: {
		flexDirection: "column",
		gap: 20,
	},
	datePickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: "#E9ECEF",
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
	},
	modalHeader: {
		fontSize: 16,
		marginBottom: 10,
	},
	addGroupButtonContainer: {
		alignItems: "flex-end",
		marginBottom: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	validationError: {
		color: "red",
		fontSize: 14,
		marginTop: 15,
		textAlign: "center",
	},
	datePicker: {
		width: "100%",
	},
});

export default Groups;
