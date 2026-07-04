import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { DayInfo } from "../types";

interface WeekHeatmapProps {
  /** Rolling window of days to render, oldest to newest (see buildWeek). */
  days: DayInfo[];
  isCompleted: (dateKey: string) => boolean;
  /** Fill color for completed days; empty days render as a translucent dot. */
  tint?: string;
}

/**
 * Compact 7-dot completion heatmap for a single habit, one dot per day in
 * the given window. Designed to sit on top of a habit card's own pastel
 * background, so the empty state uses a translucent white dot rather than
 * a fixed color.
 */
export const WeekHeatmap: React.FC<WeekHeatmapProps> = ({
  days,
  isCompleted,
  tint = "#1A1A1A",
}) => {
  return (
    <View className="mt-3 flex-row justify-between">
      {days.map((day) => {
        const dateKey = day.dateKey ?? "";
        const filled = dateKey ? isCompleted(dateKey) : false;

        return (
          <View key={dateKey || day.date} className="items-center">
            <Text
              className="mb-1 font-[Inter_600SemiBold] text-[10px] tracking-[-0.08px]"
              style={{ color: tint, opacity: day.isToday ? 1 : 0.5 }}
            >
              {day.day.slice(0, 1)}
            </Text>
            <View
              className="h-5 w-5 items-center justify-center rounded-full"
              style={{
                backgroundColor: filled ? tint : "rgba(255,255,255,0.45)",
              }}
            >
              {filled && <Ionicons name="checkmark" size={12} color="#FFF" />}
            </View>
          </View>
        );
      })}
    </View>
  );
};
