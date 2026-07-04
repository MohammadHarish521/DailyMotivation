import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DayInfo } from "../types";

// Deeper green accent from the same pastel family as the sleep card
// (#D4F4DD), used for the selected-day pill instead of solid black.
const SELECTED_COLOR = "#4CAF7D";

interface WeekCalendarProps {
  days: DayInfo[];
  /** Currently selected day. Defaults to highlighting today when omitted. */
  selectedDay?: DayInfo | null;
  onDayPress?: (day: DayInfo) => void;
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
  days,
  selectedDay,
  onDayPress,
}) => {
  return (
    <View className="mb-4 flex-row justify-between gap-2">
      {days.map((day, index) => {
        const isSelected = selectedDay
          ? selectedDay.date === day.date
          : day.isToday;

        return (
          <TouchableOpacity
            key={index}
            className={`min-w-[50px] flex-1 items-center rounded-2xl p-3 ${
              isSelected ? "bg-[#4CAF7D]" : "bg-[#D4F4DD]"
            }`}
            onPress={() => onDayPress?.(day)}
            activeOpacity={0.7}
          >
            <Text
              className={`mb-1 font-[Inter_700Bold] text-lg tracking-[-0.08px] ${
                isSelected ? "text-white" : "text-[#1A1A1A]"
              }`}
            >
              {day.date}
            </Text>
            <Text
              className={`font-[Inter_600SemiBold] text-xs tracking-[-0.08px] ${
                isSelected ? "text-white" : "text-[#1A1A1A]"
              }`}
            >
              {day.day}
            </Text>

            {/* Today indicator: persists regardless of selection state. */}
            {day.isToday && (
              <View
                className="mt-1 h-[5px] w-[5px] rounded-full"
                style={{
                  backgroundColor: isSelected ? "#FFF" : SELECTED_COLOR,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
