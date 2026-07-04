import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CompletionMap,
  Habit,
  NotificationSettings,
  QuoteState,
  StreakState,
  UserPreferences,
} from "../types";

const HABITS_KEY = "@dailymotivation/habits";
const COMPLETIONS_KEY = "@dailymotivation/completions";
const SEEDED_KEY = "@dailymotivation/seeded";
const PREFERENCES_KEY = "@dailymotivation/preferences";
const QUOTE_STATE_KEY = "@dailymotivation/quoteState";
const STREAK_KEY = "@dailymotivation/streak";
const FAVORITES_KEY = "@dailymotivation/favorites";
const NOTIFICATION_SETTINGS_KEY = "@dailymotivation/notificationSettings";

/**
 * Thin persistence layer over AsyncStorage. All reads are defensive:
 * malformed or missing data resolves to a sane empty default rather than
 * throwing, so the app can always boot.
 */
export const storage = {
  async loadHabits(): Promise<Habit[]> {
    try {
      const raw = await AsyncStorage.getItem(HABITS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Habit[]) : [];
    } catch (err) {
      console.warn("Failed to load habits from storage:", err);
      return [];
    }
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    } catch (err) {
      console.warn("Failed to save habits to storage:", err);
    }
  },

  async loadCompletions(): Promise<CompletionMap> {
    try {
      const raw = await AsyncStorage.getItem(COMPLETIONS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object"
        ? (parsed as CompletionMap)
        : {};
    } catch (err) {
      console.warn("Failed to load completions from storage:", err);
      return {};
    }
  },

  async saveCompletions(completions: CompletionMap): Promise<void> {
    try {
      await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
    } catch (err) {
      console.warn("Failed to save completions to storage:", err);
    }
  },

  async hasSeeded(): Promise<boolean> {
    try {
      return (await AsyncStorage.getItem(SEEDED_KEY)) === "true";
    } catch (err) {
      console.warn("Failed to read seeded flag from storage:", err);
      return false;
    }
  },

  async markSeeded(): Promise<void> {
    try {
      await AsyncStorage.setItem(SEEDED_KEY, "true");
    } catch (err) {
      console.warn("Failed to write seeded flag to storage:", err);
    }
  },

  async loadPreferences(): Promise<UserPreferences | null> {
    try {
      const raw = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object"
        ? (parsed as UserPreferences)
        : null;
    } catch (err) {
      console.warn("Failed to load preferences from storage:", err);
      return null;
    }
  },

  async savePreferences(prefs: UserPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    } catch (err) {
      console.warn("Failed to save preferences to storage:", err);
    }
  },

  async loadQuoteState(): Promise<QuoteState | null> {
    try {
      const raw = await AsyncStorage.getItem(QUOTE_STATE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object"
        ? (parsed as QuoteState)
        : null;
    } catch (err) {
      console.warn("Failed to load quote state from storage:", err);
      return null;
    }
  },

  async saveQuoteState(state: QuoteState): Promise<void> {
    try {
      await AsyncStorage.setItem(QUOTE_STATE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to save quote state to storage:", err);
    }
  },

  async loadStreak(): Promise<StreakState | null> {
    try {
      const raw = await AsyncStorage.getItem(STREAK_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object"
        ? (parsed as StreakState)
        : null;
    } catch (err) {
      console.warn("Failed to load streak from storage:", err);
      return null;
    }
  },

  async saveStreak(state: StreakState): Promise<void> {
    try {
      await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to save streak to storage:", err);
    }
  },

  async loadFavorites(): Promise<string[]> {
    try {
      const raw = await AsyncStorage.getItem(FAVORITES_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch (err) {
      console.warn("Failed to load favorites from storage:", err);
      return [];
    }
  },

  async saveFavorites(favorites: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.warn("Failed to save favorites to storage:", err);
    }
  },

  async loadNotificationSettings(): Promise<NotificationSettings | null> {
    try {
      const raw = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object"
        ? (parsed as NotificationSettings)
        : null;
    } catch (err) {
      console.warn("Failed to load notification settings from storage:", err);
      return null;
    }
  },

  async saveNotificationSettings(
    settings: NotificationSettings,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        NOTIFICATION_SETTINGS_KEY,
        JSON.stringify(settings),
      );
    } catch (err) {
      console.warn("Failed to save notification settings to storage:", err);
    }
  },
};
