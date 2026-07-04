import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { NotificationSettings } from "../types";

const DAILY_REMINDER_ID = "daily-motivation-reminder";

// Show alerts while the app is foregrounded (matters mainly for testing;
// the daily reminder normally fires while the app is backgrounded/closed).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Requests notification permissions if not already granted. Returns
 * whether the app is allowed to schedule/show notifications.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

/**
 * (Re)schedules the single daily motivation reminder at the given time,
 * replacing any previously scheduled one. No-op (and cancels) when
 * disabled.
 */
export async function scheduleDailyReminder(
  settings: NotificationSettings,
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID).catch(
    () => {},
  );

  if (!settings.enabled) return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("daily-reminder", {
      name: "Daily reminder",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  await Notifications.scheduleNotificationAsync({
    identifier: DAILY_REMINDER_ID,
    content: {
      title: "Your daily motivation is ready ✨",
      body: "Open DailyMotivation for today's quote and habits.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: settings.hour,
      minute: settings.minute,
    },
  });
}

/** Cancels the daily reminder without touching stored settings. */
export async function cancelDailyReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID).catch(
    () => {},
  );
}
