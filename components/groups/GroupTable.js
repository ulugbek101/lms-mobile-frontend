import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GroupTableItem from "../groups/GroupTableItem";

const GroupsTable = ({ groups, onEdit, onDelete }) => {
	// Sort groups alphabetically by name
	const sortedGroups = groups.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<View style={styles.tableContainer}>
			{/* Table Header */}
			<View style={styles.tableHeader}>
				<Text style={[styles.headerText, styles.numberHeader]}>#</Text>
				<Text style={[styles.headerText, styles.nameHeader]}>Guruh nomi</Text>
				<Text style={[styles.headerText, styles.membersHeader]}>Ustoz</Text>
				<Text style={[styles.headerText, styles.actionsHeader]}>Amallar</Text>
			</View>

			{/* Table Rows */}
			<FlatList
				data={sortedGroups} // Use the sorted groups here
				keyExtractor={item => item.id.toString()}
				renderItem={({ item, index }) => (
					<GroupTableItem
						index={index}
						item={item}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				)}
				ListEmptyComponent={
					<Text style={styles.emptyText}>Guruhlar mavjud emas</Text>
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
	membersHeader: {
		width: 120,
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

export default GroupsTable;
