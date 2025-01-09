import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Toast from "react-native-toast-message"; // Import Toast

import SubjectsTable from "../components/subjects/SubjectTable";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import useAxios from "../hooks/useAxios";

function Subjects() {
	const [subjects, setSubjects] = useState([]);
	const [isLoading, setIsLoading] = useState(false); // loading state for subjects
	const [isActionLoading, setIsActionLoading] = useState(false); // loading state for update or delete actions
	const axiosInstance = useAxios();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [editedName, setEditedName] = useState("");
	const [newSubjectName, setNewSubjectName] = useState(""); // State for new subject name
	const [isAdding, setIsAdding] = useState(false); // State to track if we are adding a new subject
	const [validationError, setValidationError] = useState(""); // State for validation error message

	// Function to fetch subjects from the server
	const fetchSubjects = async () => {
		setIsLoading(true);
		try {
			const response = await axiosInstance.get("/subjects/");
			setSubjects(response.data); // assuming the response data contains the subjects
		} catch (error) {
			let errorMessage = "An error occurred";
			// Check the error type to display a specific message
			if (!error.response) {
				// If no response, it may be a network error
				errorMessage = "Internetga bog'lanish mavjud emas";
			} else if (error.response.status === 500) {
				// Handle server errors
				errorMessage = "Server xatoligi, iltimos keyinroq urinib ko'ring";
			} else if (error.response.status === 404) {
				// Handle not found errors
				errorMessage = "Fanlar topilmadi!";
			}
			console.error("Error while fetching subjects", error);
		} finally {
			setIsLoading(false); // Hide the loading indicator after the request is done
		}
	};

	// Fetch subjects when the component is mounted
	useEffect(() => {
		fetchSubjects();
	}, []);

	const handleEdit = subject => {
		setSelectedSubject(subject);
		setEditedName(subject.name);
		setIsModalVisible(true);
	};

	const handleSave = async () => {
		setIsActionLoading(true);
		try {
			// Update subject
			await axiosInstance.put(`/subjects/${selectedSubject.id}/`, {
				name: editedName,
			});
			// Re-fetch subjects after successful update
			fetchSubjects();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				// Display Toast message if subject name exists already
				Toast.show({
					type: "error",
					position: "top",
					text1: "Fan nomini yangilashda xatolik",
					text2: "Bunday nomli fan allaqachon mavjud",
				});
			}
			console.log("Error while saving subject", error);
		} finally {
			setIsActionLoading(false);
			setIsModalVisible(false);
			setSelectedSubject(null);
		}
	};

	const handleDelete = async id => {
		setIsActionLoading(true);
		try {
			// Delete subject
			await axiosInstance.delete(`/subjects/${id}/`);
			// Re-fetch subjects after successful delete
			fetchSubjects();
		} catch (error) {
			if (error.response && error.response.status === 500) {
				// Display Toast message for server error during delete
				Toast.show({
					type: "error",
					position: "top",
					text1: "Fanga bog'liq guruhlar mavjud",
					text2: "Guruhlarni o'chirib, keyin fanni o'chiring",
				});
			} else {
				Toast.show({
					type: "error",
					position: "top",
					text1: "Fan o'chirishda xatolik",
					text2: "Server xatoligi, iltimos keyinroq urinib ko'ring",
				});
			}
			console.log("Error while deleting subject", error);
		} finally {
			setIsActionLoading(false);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setSelectedSubject(null);
		setIsAdding(false); // Reset adding state when canceling
		setNewSubjectName(""); // Reset new subject name
		setValidationError(""); // Reset validation error
	};

	const handleAddNewSubject = () => {
		setIsAdding(true); // Track adding state
		setIsModalVisible(true); // Show modal for adding a new subject
	};

	const handleSaveNewSubject = async () => {
		if (newSubjectName.length < 3) {
			setValidationError("Fan nomi kamida 3 belgidan iborat bo'lishi kerak");
			return;
		}
		setValidationError(""); // Clear any previous error
		setIsActionLoading(true);
		try {
			// Add new subject
			await axiosInstance.post("/subjects/", {
				name: newSubjectName,
			});
			// Re-fetch subjects after successful add
			fetchSubjects();
		} catch (error) {
			if (error.response && error.response.status === 400) {
				// Display Toast message if subject name exists already
				Toast.show({
					type: "error",
					position: "top",
					text1: "Fan qo'shishda xatolik yuz berdi",
					text2: "Bunday nomli fan allaqachon mavjud",
				});
			}
			console.log("Error while adding subject", error);
		} finally {
			setIsActionLoading(false);
			setIsModalVisible(false);
			setIsAdding(false);
			setNewSubjectName(""); // Clear input after saving
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.addSubjectButtonContainer}>
				<Button
					buttonText="Fan qo'shish"
					buttonHeight={30}
					buttonWidth="35%"
					handlePress={handleAddNewSubject} // Trigger modal for adding new subject
				/>
			</View>

			{/* Show loading indicator instead of table */}
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#007BFF" />
				</View>
			) : (
				<SubjectsTable
					subjects={subjects}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			{/* Show loading indicator during update or delete */}
			{isActionLoading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#007BFF" />
				</View>
			)}

			<Modal
				isVisible={isModalVisible}
				onCancel={handleCancel}
				onSave={isAdding ? handleSaveNewSubject : handleSave} // Use appropriate save function
				saveButtonText={isAdding ? "Qo'shish" : "Saqlash"}
				cancelButtonText="Bekor qilish"
			>
				<Text style={styles.modalHeader}>
					{isAdding ? "Yangi fan qo'shish" : "Fan nomini o'zgartirish"}
				</Text>
				<TextInput
					autoFocus
					style={styles.input}
					value={isAdding ? newSubjectName : editedName}
					onChangeText={isAdding ? setNewSubjectName : setEditedName}
				/>
				{/* Show validation error message below the input */}
				{validationError && (
					<Text style={styles.validationError}>{validationError}</Text>
				)}
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "#E9ECEF",
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
		marginTop: 10,
	},
	modalHeader: {
		fontSize: 16,
		marginBottom: 10,
	},
	addSubjectButtonContainer: {
		alignItems: "flex-end",
		marginBottom: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 500, // Add margin from the table header
	},
	validationError: {
		color: "red",
		fontSize: 14,
		marginTop: 5,
		marginBottom: 10, // Adjust the margin below the error message
	},
});

export default Subjects;
