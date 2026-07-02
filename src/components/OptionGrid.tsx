import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Option } from "../data/onboarding";
import { typography } from "../theme/typography";

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
    <View style={styles.grid}>
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <TouchableOpacity
            key={option.id}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onToggle(option.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chip: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#EDEDED",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 14,
    alignItems: "center",
  },
  chipSelected: {
    borderColor: "#2B5CE6",
    backgroundColor: "#EEF3FF",
  },
  emoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  label: {
    ...typography.semiBold,
    fontSize: 15,
    color: "#1A1A1A",
  },
  labelSelected: {
    color: "#2B5CE6",
  },
});
