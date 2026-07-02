import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HabitCard } from "../components/HabitCard";
import { WeekCalendar } from "../components/WeekCalendar";
import { useHabits } from "../context/HabitsContext";
import { typography } from "../theme/typography";
import { DayInfo } from "../types";

export const HomeScreen: React.FC = () => {
  const { habits, loading } = useHabits();
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
            <Text style={styles.greeting}>Good Morning, Alice</Text>
          </View>

          {/* Week Calendar */}
          <WeekCalendar days={weekDays} onDayPress={setSelectedDay} />

          {/* Habits */}
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabIcon}>
            <View style={styles.homeIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabIconCircle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabIconCircle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <View style={styles.profilePic}>
            <Text style={styles.profileText}>👤</Text>
          </View>
        </TouchableOpacity>
      </View>

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
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  homeIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#1A1A1A",
    borderRadius: 6,
  },
  tabIconCircle: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
  profilePic: {
    width: 36,
    height: 36,
    backgroundColor: "#D4F4DD",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontSize: 20,
  },
});
