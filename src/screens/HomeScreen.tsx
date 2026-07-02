import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HabitCard } from "../components/HabitCard";
import { WeekCalendar } from "../components/WeekCalendar";
import { useHabits } from "../context/HabitsContext";
import { usePreferences } from "../context/PreferencesContext";
import { useTimeGreeting } from "../hooks/useTimeGreeting";
import { typography } from "../theme/typography";
import { DayInfo } from "../types";

export const HomeScreen: React.FC = () => {
  const { habits, loading } = useHabits();
  const { preferences } = usePreferences();
  const greeting = useTimeGreeting();
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);

  const weekDays: DayInfo[] = [
    { date: 21, day: "Mon", isToday: false },
    { date: 22, day: "Tue", isToday: false },
    { date: 23, day: "Wed", isToday: false },
    { date: 24, day: "Thu", isToday: true },
    { date: 25, day: "Fri", isToday: false },
    { date: 26, day: "Sat", isToday: false },
  ];

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#1A1A1A" />
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>
              {greeting}
              {preferences?.name ? `, ${preferences.name}` : ""}
            </Text>
          </View>

          {/* Week Calendar */}
          <WeekCalendar days={weekDays} onDayPress={setSelectedDay} />

          {/* Habits */}
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    ...typography.bold,
    fontSize: 28,
    color: "#1A1A1A",
  },
});
