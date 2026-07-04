import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useHabits } from "../context/HabitsContext";
import { useNotificationSettings } from "../context/NotificationSettingsContext";
import { usePreferences } from "../context/PreferencesContext";
import { useQuote } from "../context/QuoteContext";

function formatTime(hour: number, minute: number): string {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export const ProfileScreen: React.FC = () => {
  const { preferences } = usePreferences();
  const { streak } = useQuote();
  const { habits } = useHabits();
  const { settings, enableReminder, disableReminder, setReminderTime } =
    useNotificationSettings();
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleToggle = async (value: boolean) => {
    if (value) {
      const granted = await enableReminder();
      if (!granted) {
        Alert.alert(
          "Notifications disabled",
          "Enable notifications for DailyMotivation in your device settings to get a daily reminder.",
        );
      }
    } else {
      await disableReminder();
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") setPickerVisible(false);
    if (event.type === "dismissed" || !date) return;
    setReminderTime(date.getHours(), date.getMinutes());
  };

  const pickerValue = new Date();
  pickerValue.setHours(settings.hour, settings.minute, 0, 0);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 pb-[100px]">
          <Text className="mb-6 font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
            Profile
          </Text>

          {/* Identity + stats */}
          <View className="mb-6 rounded-3xl bg-white p-6">
            <Text className="mb-4 font-[Inter_700Bold] text-xl tracking-[-0.08px] text-[#1A1A1A]">
              {preferences?.name ?? "Friend"}
            </Text>
            <View className="flex-row gap-6">
              <View>
                <Text className="font-[Inter_700Bold] text-2xl tracking-[-0.08px] text-[#1A1A1A]">
                  🔥 {streak}
                </Text>
                <Text className="font-[Inter_500Medium] text-xs tracking-[-0.08px] text-[#8A8A8A]">
                  Day streak
                </Text>
              </View>
              <View>
                <Text className="font-[Inter_700Bold] text-2xl tracking-[-0.08px] text-[#1A1A1A]">
                  {habits.length}
                </Text>
                <Text className="font-[Inter_500Medium] text-xs tracking-[-0.08px] text-[#8A8A8A]">
                  Habits tracked
                </Text>
              </View>
            </View>
          </View>

          {/* Notification settings */}
          <View className="rounded-3xl bg-white p-6">
            <Text className="mb-4 font-[Inter_700Bold] text-lg tracking-[-0.08px] text-[#1A1A1A]">
              Daily reminder
            </Text>

            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="font-[Inter_600SemiBold] text-base tracking-[-0.08px] text-[#1A1A1A]">
                  Remind me daily
                </Text>
                <Text className="mt-0.5 font-[Inter_500Medium] text-sm tracking-[-0.08px] text-[#8A8A8A]">
                  A nudge to check today's quote and habits
                </Text>
              </View>
              <Switch value={settings.enabled} onValueChange={handleToggle} />
            </View>

            {settings.enabled && (
              <TouchableOpacity
                className="flex-row items-center justify-between rounded-2xl bg-[#FAFAFA] px-4 py-3"
                onPress={() => setPickerVisible(true)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={18} color="#1A1A1A" />
                  <Text className="font-[Inter_600SemiBold] text-base tracking-[-0.08px] text-[#1A1A1A]">
                    Reminder time
                  </Text>
                </View>
                <Text className="font-[Inter_700Bold] text-base tracking-[-0.08px] text-[#1A1A1A]">
                  {formatTime(settings.hour, settings.minute)}
                </Text>
              </TouchableOpacity>
            )}

            {pickerVisible && (
              <DateTimePicker
                value={pickerValue}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleTimeChange}
              />
            )}

            {pickerVisible && Platform.OS === "ios" && (
              <TouchableOpacity
                className="mt-3 items-center rounded-2xl bg-[#1A1A1A] py-3"
                onPress={() => setPickerVisible(false)}
                activeOpacity={0.8}
              >
                <Text className="font-[Inter_700Bold] text-sm tracking-[-0.08px] text-white">
                  Done
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
