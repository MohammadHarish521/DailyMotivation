import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DayInfo, Habit } from "../types";
import { CharacterBlob, MascotActivity } from "./CharacterBlob";
import { WeekHeatmap } from "./WeekHeatmap";

interface HabitCardProps {
  habit: Habit;
  /** Whether this habit is marked done for the day the card represents. */
  completed?: boolean;
  /** Toggles completion; omit to render the card without a checkbox. */
  onToggleComplete?: () => void;
  /** Consecutive-day streak for this habit, shown next to the title. */
  streak?: number;
  /** When provided alongside isCompleted, renders a 7-day heatmap strip. */
  weekDays?: DayInfo[];
  isCompleted?: (dateKey: string) => boolean;
  onPress?: () => void;
  /** Long-press handler, used for delete confirmation. */
  onLongPress?: () => void;
}

function getActivity(title: string): MascotActivity {
  if (title === "Sleep for 8 hours") return "sleep";
  if (title === "Go for a walk") return "walk";
  return "meditate";
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  completed = false,
  onToggleComplete,
  streak,
  weekDays,
  isCompleted,
  onPress,
  onLongPress,
}) => {
  const activity = getActivity(habit.title);
  // Darker, near-black text on the walk card's pink keeps title/duration
  // comfortably above WCAG AA contrast.
  const textColor = "#1A1A1A";

  return (
    <TouchableOpacity
      className="mb-4 min-h-[200px] rounded-3xl p-5"
      style={{ backgroundColor: habit.color }}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
    >
      <View className="mb-4 flex-row items-start justify-between">
        <View className="mr-3 flex-1 flex-row items-center">
          <Text
            className="flex-1 font-[Inter_700Bold] text-xl tracking-[-0.08px]"
            style={{ color: textColor }}
          >
            {habit.title}
          </Text>
          {!!streak && streak > 0 && (
            <View className="ml-2 flex-row items-center gap-1">
              <Text className="text-sm">🔥</Text>
              <Text
                className="font-[Inter_700Bold] text-sm tracking-[-0.08px]"
                style={{ color: textColor }}
              >
                {streak}
              </Text>
            </View>
          )}
        </View>

        {onToggleComplete ? (
          <TouchableOpacity
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completed }}
            accessibilityLabel={
              completed
                ? `Mark ${habit.title} as not done`
                : `Mark ${habit.title} as done`
            }
            onPress={onToggleComplete}
            className="h-8 w-8 items-center justify-center rounded-full"
            style={{
              backgroundColor: completed ? textColor : "rgba(255,255,255,0.6)",
            }}
          >
            {completed && <Ionicons name="checkmark" size={18} color="#FFF" />}
          </TouchableOpacity>
        ) : habit.duration ? (
          <View className="flex-row items-center rounded-[10px] bg-white/50 px-2 py-1">
            <Ionicons
              name="time-outline"
              size={12}
              color={textColor}
              style={{ marginRight: 4 }}
            />
            <Text
              className="font-[Inter_600SemiBold] text-[13px] tracking-[-0.08px]"
              style={{ color: textColor }}
            >
              {habit.duration}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="flex-1 items-center justify-center">
        <CharacterBlob size={100} activity={activity} />
      </View>

      <View className="mt-2 flex-row items-center gap-2">
        {habit.duration ? (
          <View className="flex-row items-center rounded-[10px] bg-white/50 px-2 py-1">
            <Ionicons
              name="time-outline"
              size={12}
              color={textColor}
              style={{ marginRight: 4 }}
            />
            <Text
              className="font-[Inter_600SemiBold] text-[13px] tracking-[-0.08px]"
              style={{ color: textColor }}
            >
              {habit.duration}
            </Text>
          </View>
        ) : null}
        {habit.frequency ? (
          <View className="flex-row items-center rounded-[10px] bg-white/50 px-2 py-1">
            <Ionicons
              name="repeat-outline"
              size={12}
              color={textColor}
              style={{ marginRight: 4 }}
            />
            <Text
              className="font-[Inter_500Medium] text-[13px] tracking-[-0.08px]"
              style={{ color: textColor }}
            >
              {habit.frequency}
            </Text>
          </View>
        ) : null}
      </View>

      {weekDays && isCompleted && (
        <WeekHeatmap
          days={weekDays}
          isCompleted={isCompleted}
          tint={textColor}
        />
      )}
    </TouchableOpacity>
  );
};
