import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { HabitCard } from "../components/HabitCard";
import { QuoteCard } from "../components/QuoteCard";
import { StreakBadge } from "../components/StreakBadge";
import { WeekCalendar } from "../components/WeekCalendar";
import { useHabits } from "../context/HabitsContext";
import { usePreferences } from "../context/PreferencesContext";
import { useQuote } from "../context/QuoteContext";
import { useTimeGreeting } from "../hooks/useTimeGreeting";
import { DayInfo } from "../types";
import { buildWeek } from "../utils/date";

export const HomeScreen: React.FC = () => {
  const { habits, loading, toggleCompletion, isCompleted, getStreak } =
    useHabits();
  const { preferences } = usePreferences();
  const { quote, streak, loading: quoteLoading, getNewQuote } = useQuote();
  const greeting = useTimeGreeting();
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getNewQuote();
    // Brief delay so the pull-to-refresh spinner feels intentional rather
    // than instant/flickery.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setRefreshing(false);
  }, [getNewQuote]);

  // Real rolling 7-day window (6 days back through today), not a hardcoded stub.
  const weekDays: DayInfo[] = useMemo(() => buildWeek(), []);

  if (loading || quoteLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#FAFAFA]">
        <ActivityIndicator size="large" color="#1A1A1A" />
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-6 pb-[100px]">
          {/* Header */}
          <View className="mb-6 flex-row items-start justify-between gap-3">
            <Text className="flex-1 font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
              {greeting}
              {preferences?.name ? `, ${preferences.name}` : ""}
            </Text>
            <StreakBadge streak={streak} />
          </View>

          {/* Daily quote */}
          {quote && <QuoteCard text={quote.text} onRefresh={getNewQuote} />}

          {/* Week Calendar */}
          <WeekCalendar
            days={weekDays}
            selectedDay={selectedDay}
            onDayPress={setSelectedDay}
          />

          {/* Habits */}
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completed={isCompleted(habit.id)}
              onToggleComplete={() => toggleCompletion(habit.id)}
              streak={getStreak(habit.id)}
            />
          ))}
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
