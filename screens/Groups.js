import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import DatePickerComponent from "../components/groups/DatePicker";
import GroupStateDropdown from "../components/groups/GroupStateDropdown";
import GroupsTable from "../components/groups/GroupTable";
import LessonDaysDropdown from "../components/groups/LessonDaysDropdown";
import SubjectDropdown from "../components/groups/SubjectDropdown";
import TeacherDropdown from "../components/groups/TeacherDropdown";
import TimePicker from "../components/groups/TimePicker";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import useAxios from "../hooks/useAxios";

function GroupManager() {
	const [groupList, setGroupList] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [isActionInProgress, setIsActionInProgress] = useState(false);
	const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [currentGroup, setCurrentGroup] = useState(null);
	const [groupNameToEdit, setGroupNameToEdit] = useState("");
	const [newGroupName, setNewGroupName] = useState("");
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [selectedLessonDays, setSelectedLessonDays] = useState("");
	const [groupStartDate, setGroupStartDate] = useState(new Date());
	const [groupEndDate, setGroupEndDate] = useState(new Date());
	const [lessonStartTime, setLessonStartTime] = useState(null);
	const [lessonEndTime, setLessonEndTime] = useState(null);
	const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
		useState(false);
	const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
	const [groupState, setGroupState] = useState(null);
	const [assignedTeacher, setAssignedTeacher] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const axiosInstance = useAxios();

	const fetchGroups = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get("/groups/");
			setGroupList(response.data);
		} catch (error) {
			let errorMessage = "An error occurred";
			if (!error.response) {
				errorMessage = "No internet connection";
			} else if (error.response.status === 500) {
				errorMessage = "Server error, please try again later";
			} else if (error.response.status === 404) {
				errorMessage = "No groups found!";
			}
			console.error("Error while fetching groups", error);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchGroups();
	}, []);

	const handleCreateNewGroup = () => {
		setNewGroupName("");
		setSelectedLessonDays("");
		setGroupStartDate(new Date());
		setGroupEndDate(new Date());
		setLessonStartTime(null);
		setLessonEndTime(null);
		setGroupState(null);
		setAssignedTeacher(null);
		setIsCreateModalVisible(true);
	};

	const formatTime = time => {
		if (!time) {
			throw new Error("Time is undefined or invalid");
		}

		// Assuming `time` is in `1:00 AM` format
		const timeParts = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
		if (!timeParts) {
			throw new Error("Invalid time format");
		}

		let [_, hours, minutes, period] = timeParts;
		hours = parseInt(hours, 10);
		minutes = parseInt(minutes, 10);

		if (period.toUpperCase() === "PM" && hours !== 12) {
			hours += 12;
		} else if (period.toUpperCase() === "AM" && hours === 12) {
			hours = 0;
		}

		return (
			`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}` +
			":00"
		);
	};

	const handleSaveNewGroup = async () => {
		if (
			!newGroupName ||
			!assignedTeacher ||
			!selectedLessonDays ||
			!groupStartDate ||
			!groupEndDate ||
			groupState === null ||
			!selectedSubject ||
			!lessonStartTime ||
			!lessonEndTime
		) {
			setErrorMessage("Please fill out all fields");
			return;
		}

		setErrorMessage("");
		setIsActionInProgress(true);

		try {
			const formatDate = date => {
				const d = new Date(date);
				const day = String(d.getDate()).padStart(2, "0");
				const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
				const year = d.getFullYear();
				return `${year}-${month}-${day}`;
			};

			const formData = {
				name: newGroupName,
				teacher_id: assignedTeacher,
				subject_id: selectedSubject,
				lesson_days: selectedLessonDays,
				start_date: formatDate(groupStartDate),
				end_date: formatDate(groupEndDate),
				is_active: groupState,
				lesson_start_time: formatTime(lessonStartTime),
				lesson_end_time: formatTime(lessonEndTime),
			};

			await axiosInstance.post("/groups/", formData);
			fetchGroups();
			Toast.show({
				type: "success",
				text1: "Guruh muvaffaqiyatli qo'shildi",
			});
		} catch (error) {
			console.error("Error while adding group", error);
		} finally {
			setIsActionInProgress(false);
			setIsCreateModalVisible(false);
		}
	};

	const handleCancelCreate = () => {
		setIsCreateModalVisible(false);
		setErrorMessage("");
	};

	const handleEditGroup = group => {
		setCurrentGroup(group);
		setGroupNameToEdit(group.name);
		setSelectedLessonDays(group.lesson_days);
		setGroupStartDate(new Date(group.start_date));
		setGroupEndDate(new Date(group.end_date));
		setGroupState(group.state);
		setAssignedTeacher(group.teacher.id);
		setIsEditModalVisible(true);
	};

	const handleSaveEditGroup = async () => {
		if (
			!groupNameToEdit ||
			!assignedTeacher ||
			!selectedLessonDays ||
			!groupStartDate ||
			!groupEndDate ||
			groupState === null
		) {
			setErrorMessage("Please fill out all fields");
			return;
		}
		setErrorMessage("");
		setIsActionInProgress(true);
		try {
			await axiosInstance.put(`/groups/${currentGroup.id}/`, {
				name: groupNameToEdit,
				teacher: assignedTeacher,
				lesson_days: selectedLessonDays,
				start_date: groupStartDate,
				end_date: groupEndDate,
				state: groupState,
			});
			fetchGroups();
		} catch (error) {
			console.error("Error while editing group", error);
		} finally {
			setIsActionInProgress(false);
			setIsEditModalVisible(false);
		}
	};

	const handleCancelEdit = () => {
		setIsEditModalVisible(false);
		setErrorMessage("");
	};

	// Handle Delete Function
	const handleDeleteGroup = async groupId => {
		setIsActionInProgress(true);
		try {
			await axiosInstance.delete(`/groups/${groupId}/`);
			fetchGroups();
			Toast.show({
				type: "success",
				text1: "Guruh muvaffaqiyatli o'chirildi",
			});
		} catch (error) {
			console.error("Error while deleting group", error);
			Toast.show({
				type: "error",
				text1: "Xatolik",
				text2: "Guruhni o'chirishda xatolik yuz berdi",
			});
		} finally {
			setIsActionInProgress(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.addGroupButtonContainer}>
				<Button
					buttonText={<MaterialIcons name="sync" size={24} />}
					buttonHeight={30}
					buttonWidth="15%"
					handlePress={fetchGroups}
				/>
				<Button
					buttonText="Guruh qo'shish"
					buttonHeight={30}
					buttonWidth="45%"
					handlePress={handleCreateNewGroup}
				/>
			</View>

			{isFetching ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#007BFF" />
				</View>
			) : (
				<GroupsTable
					groups={groupList}
					onEdit={handleEditGroup}
					onDelete={handleDeleteGroup} // Pass handleDeleteGroup to GroupsTable
				/>
			)}

			{isActionInProgress && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#007BFF" />
				</View>
			)}

			{isCreateModalVisible && (
				<Modal
					isVisible={isCreateModalVisible}
					onCancel={handleCancelCreate}
					onSave={handleSaveNewGroup}
					saveButtonText="Saqlash"
					cancelButtonText="Bekor qilish"
				>
					<View style={styles.fields}>
						<Text style={styles.modalHeader}>Yangi guruh qo'shish</Text>

						<TeacherDropdown onTeacherSelect={setAssignedTeacher} />

						<SubjectDropdown onSubjectSelect={setSelectedSubject} />

						<TextInput
							placeholderTextColor="#00000070"
							style={styles.input}
							placeholder="Group Name"
							value={newGroupName}
							onChangeText={setNewGroupName}
						/>

						<View style={styles.datePickers}>
							<DatePickerComponent
								label="Start Date:"
								date={groupStartDate}
								showDatePicker={isStartDatePickerVisible}
								setShowDatePicker={setIsStartDatePickerVisible}
								setDate={setGroupStartDate}
							/>
							<DatePickerComponent
								label="End Date:"
								date={groupEndDate}
								showDatePicker={isEndDatePickerVisible}
								setShowDatePicker={setIsEndDatePickerVisible}
								setDate={setGroupEndDate}
							/>
						</View>

						<LessonDaysDropdown
							lessonDaysSelected={selectedLessonDays}
							setState={setSelectedLessonDays}
						/>

						<TimePicker
							label="Lesson Start Time"
							value={lessonStartTime}
							onChange={setLessonStartTime}
						/>
						<TimePicker
							label="Lesson End Time"
							value={lessonEndTime}
							onChange={setLessonEndTime}
						/>

						<GroupStateDropdown setState={setGroupState} />
					</View>

					{errorMessage && (
						<Text style={styles.validationError}>{errorMessage}</Text>
					)}
				</Modal>
			)}

			{isEditModalVisible && (
				<Modal
					isVisible={isEditModalVisible}
					onCancel={handleCancelEdit}
					onSave={handleSaveEditGroup}
					saveButtonText="Save"
					cancelButtonText="Cancel"
				>
					<View style={styles.fields}>
						<Text style={styles.modalHeader}>Edit Group</Text>

						<TeacherDropdown onTeacherSelect={setAssignedTeacher} />

						<TextInput
							placeholderTextColor="#00000070"
							style={styles.input}
							placeholder="Group Name"
							value={groupNameToEdit}
							onChangeText={setGroupNameToEdit}
						/>

						<View style={styles.datePickers}>
							<DatePickerComponent
								label="Start Date:"
								date={groupStartDate}
								showDatePicker={isStartDatePickerVisible}
								setShowDatePicker={setIsStartDatePickerVisible}
								setDate={setGroupStartDate}
							/>
							<DatePickerComponent
								label="End Date:"
								date={groupEndDate}
								showDatePicker={isEndDatePickerVisible}
								setShowDatePicker={setIsEndDatePickerVisible}
								setDate={setGroupEndDate}
							/>
						</View>

						<LessonDaysDropdown
							lessonDaysSelected={selectedLessonDays}
							setState={setSelectedLessonDays}
						/>

						<TimePicker
							label="Start Time"
							value={lessonStartTime}
							onChange={setLessonStartTime}
						/>
						<TimePicker
							label="End Time"
							value={lessonEndTime}
							onChange={setLessonEndTime}
						/>

						<GroupStateDropdown setState={setGroupState} />
					</View>

					{errorMessage && (
						<Text style={styles.validationError}>{errorMessage}</Text>
					)}
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
		gap: 10,
	},
	datePickers: {
		flexDirection: "column",
		gap: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "#E9ECEF",
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
	},
	modalHeader: {
		fontSize: 18,
		fontWeight: "bold",
	},
	validationError: {
		color: "red",
		fontSize: 14,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	addGroupButtonContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginBottom: 20,
		gap: 12,
	},
});

export default GroupManager;
