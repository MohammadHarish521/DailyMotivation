import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { typography } from "../theme/typography";
import { Habit } from "../types";
import { CharacterBlob } from "./CharacterBlob";

interface HabitCardProps {
  habit: Habit;
  onPress?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: habit.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{habit.title}</Text>
        <Text style={styles.duration}>{habit.duration}</Text>
      </View>

      <View style={styles.characterContainer}>
        <CharacterBlob
          color={habit.color === "#D4F4DD" ? "#A8E6B8" : "#FF9BCF"}
          size={100}
          face={habit.title === "Sleep for 8 hours" ? "sleeping" : "happy"}
          showArms={habit.title === "Go for a walk"}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.frequency}>{habit.frequency}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    minHeight: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    ...typography.bold,
    fontSize: 20,
    color: "#1A1A1A",
    flex: 1,
  },
  duration: {
    ...typography.semiBold,
    fontSize: 16,
    color: "#1A1A1A",
  },
  characterContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  footer: {
    marginTop: 8,
  },
  frequency: {
    ...typography.medium,
    fontSize: 14,
    color: "#1A1A1A",
  },
});
