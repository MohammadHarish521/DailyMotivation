import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { typography } from "../theme/typography";
import { DayInfo } from "../types";

interface WeekCalendarProps {
  days: DayInfo[];
  onDayPress?: (day: DayInfo) => void;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  days,
  onDayPress,
}) => {
  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dayCard, day.isToday && styles.dayCardActive]}
          onPress={() => onDayPress?.(day)}
          activeOpacity={0.7}
        >
          <Text style={[styles.date, day.isToday && styles.dateActive]}>
            {day.date}
          </Text>
          <Text style={[styles.day, day.isToday && styles.dayActive]}>
            {day.day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 8,
  },
  dayCard: {
    backgroundColor: "#D4F4DD",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    minWidth: 50,
    flex: 1,
  },
  dayCardActive: {
    backgroundColor: "#1A1A1A",
  },
  date: {
    ...typography.bold,
    fontSize: 18,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  dateActive: {
    color: "#FFF",
  },
  day: {
    ...typography.semiBold,
    fontSize: 12,
    color: "#1A1A1A",
  },
  dayActive: {
    color: "#FFF",
  },
});
