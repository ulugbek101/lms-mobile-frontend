import React from "react";
import {
	Modal as RNModal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const Modal = ({
	isVisible,
	onCancel,
	onSave,
	saveButtonText = "Saqlash",
	cancelButtonText = "Bekor qilish",
	children,
}) => {
	return (
		<RNModal visible={isVisible} transparent animationType="fade">
			<TouchableWithoutFeedback onPress={onCancel}>
				<View style={styles.modalOverlay}>
					<TouchableWithoutFeedback onPress={() => {}}>
						<View style={styles.modalContent}>
							{children}
							<View style={styles.modalActions}>
								<TouchableOpacity
									style={[styles.button, styles.saveButtonBg]}
									onPress={onSave}
								>
									<Text style={styles.buttonText}>{saveButtonText}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button} onPress={onCancel}>
									<Text style={styles.buttonText}>{cancelButtonText}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</RNModal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
	},
	modalActions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	button: {
		width: "45%",
		padding: 10,
		backgroundColor: "#00000070", // 00000070
		borderRadius: 8,
		alignItems: "center",
	},
	saveButtonBg: {
		backgroundColor: "#007BFF",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});

export default Modal;
