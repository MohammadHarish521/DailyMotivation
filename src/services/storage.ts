import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompletionMap, Habit, UserPreferences } from "../types";

const HABITS_KEY = "@dailymotivation/habits";
const COMPLETIONS_KEY = "@dailymotivation/completions";
const SEEDED_KEY = "@dailymotivation/seeded";
const PREFERENCES_KEY = "@dailymotivation/preferences";

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
};
