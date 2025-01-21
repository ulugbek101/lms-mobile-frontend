import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../helpers/datetimeFormatter"; // Assuming you have this utility

const DatePickerComponent = ({ label, date, showDatePicker, setShowDatePicker, setDate }) => {
  return (
    <View style={styles.datePickerContainer}>
      <Text>{label}</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerButtonText}>
          {date ? formatDate(date) : "Sana tanlang"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DatePicker
          style={styles.datePicker}
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  datePickerButton: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
  },
  datePickerButtonText: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
  datePicker: {
    width: "100%",
  },
});

export default DatePickerComponent;
