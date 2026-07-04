import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AddHabitFormValues, AddHabitModal } from "../components/AddHabitModal";
import { HabitCard } from "../components/HabitCard";
import { useHabits } from "../context/HabitsContext";
import { buildWeek } from "../utils/date";

export const HabitsScreen: React.FC = () => {
  const {
    habits,
    loading,
    addHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getStreak,
  } = useHabits();
  const [modalVisible, setModalVisible] = useState(false);

  // Same rolling 7-day window used on Home, kept stable per render pass.
  const weekDays = useMemo(() => buildWeek(), []);

  const handleAdd = (values: AddHabitFormValues) => {
    addHabit(values);
    setModalVisible(false);
  };

  const handleLongPress = (habitId: string, title: string) => {
    Alert.alert("Delete habit?", `This removes "${title}" and its history.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteHabit(habitId),
      },
    ]);
  };

  if (loading) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 pb-[100px]">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
              Habits
            </Text>
            <TouchableOpacity
              accessibilityLabel="Add habit"
              onPress={() => setModalVisible(true)}
              className="h-11 w-11 items-center justify-center rounded-full bg-[#1A1A1A]"
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {habits.length === 0 ? (
            <View className="items-center justify-center rounded-3xl bg-white p-10">
              <Text className="mb-2 text-4xl">🌱</Text>
              <Text className="mb-1 font-[Inter_700Bold] text-lg tracking-[-0.08px] text-[#1A1A1A]">
                No habits yet
              </Text>
              <Text className="text-center font-[Inter_500Medium] text-sm tracking-[-0.08px] text-[#8A8A8A]">
                Tap + to add your first habit and start building your streak.
              </Text>
            </View>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                completed={isCompleted(habit.id)}
                onToggleComplete={() => toggleCompletion(habit.id)}
                streak={getStreak(habit.id)}
                weekDays={weekDays}
                isCompleted={(dateKey) => isCompleted(habit.id, dateKey)}
                onLongPress={() => handleLongPress(habit.id, habit.title)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAdd}
      />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
