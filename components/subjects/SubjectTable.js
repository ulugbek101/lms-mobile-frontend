import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SubjectTableItem from "./SubjectTableItem";

const SubjectsTable = ({ subjects, onEdit, onDelete }) => {
	// Sort subjects alphabetically by name
	const sortedSubjects = subjects.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<View style={styles.tableContainer}>
			{/* Table Header */}
			<View style={styles.tableHeader}>
				<Text style={[styles.headerText, styles.numberHeader]}>#</Text>
				<Text style={[styles.headerText, styles.nameHeader]}>Fan nomi</Text>
				<Text style={[styles.headerText, styles.groupHeader]}>Guruhlar</Text>
				<Text style={[styles.headerText, styles.studentHeader]}>O'quvchi</Text>
				<Text style={[styles.headerText, styles.actionsHeader]}>Amallar</Text>
			</View>

			{/* Table Rows */}
			<FlatList
				data={sortedSubjects} // Use the sorted subjects here
				keyExtractor={item => item.id}
				renderItem={({ item, index }) => (
					<SubjectTableItem
						index={index}
						item={item}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				)}
				ListEmptyComponent={
					<Text style={styles.emptyText}>Fanlar mavjud emas</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	tableContainer: {
		flex: 1,
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#F1F3F5",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#E9ECEF",
	},
	headerText: {
		fontWeight: "bold",
		color: "#212529",
		fontSize: 14,
	},
	numberHeader: {
		width: 20,
		textAlign: "center",
	},
	nameHeader: {
		flex: 1,
		marginLeft: 10,
	},
	groupHeader: {
		width: 80,
		textAlign: "center",
	},
	studentHeader: {
		width: 80,
		textAlign: "center",
	},
	actionsHeader: {
		width: 80,
		textAlign: "center",
	},
	emptyText: {
		textAlign: "center",
		fontSize: 16,
		color: "#6C757D",
		marginTop: 20,
	},
});

export default SubjectsTable;
