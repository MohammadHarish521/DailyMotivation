import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Option } from "../data/onboarding";

interface OptionGridProps {
  options: Option[];
  /** Currently selected option ids. */
  selected: string[];
  /** Toggles an option id in/out of the selection. */
  onToggle: (id: string) => void;
}

/**
 * Reusable grid of selectable chips used across onboarding quiz steps.
 */
export const OptionGrid: React.FC<OptionGridProps> = ({
  options,
  selected,
  onToggle,
}) => {
  return (
    <View className="flex-row flex-wrap justify-between">
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <TouchableOpacity
            key={option.id}
            className={`mb-3.5 w-[48%] items-center rounded-[20px] border-2 px-4 py-5 ${
              isSelected
                ? "border-[#2B5CE6] bg-[#EEF3FF]"
                : "border-[#EDEDED] bg-white"
            }`}
            onPress={() => onToggle(option.id)}
            activeOpacity={0.8}
          >
            <Text className="mb-2 text-[30px]">{option.emoji}</Text>
            <Text
              className={`font-[Inter_600SemiBold] text-[15px] tracking-[-0.08px] ${
                isSelected ? "text-[#2B5CE6]" : "text-[#1A1A1A]"
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
