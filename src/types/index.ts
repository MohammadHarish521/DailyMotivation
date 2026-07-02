export interface Habit {
  id: string;
  title: string;
  /** Human-readable label shown on the card, e.g. "25 min" or "Everyday". */
  duration: string;
  /** Optional secondary label, e.g. a note or schedule hint. */
  frequency: string;
  /** Card background color (hex). */
  color: string;
  /** ISO timestamp of when the habit was created. */
  createdAt: string;
}

/**
 * Daily completion records.
 * Keyed by date string in "YYYY-MM-DD" format, mapping to the list of
 * habit ids that were marked complete on that day.
 */
export type CompletionMap = Record<string, string[]>;

export interface DayInfo {
  /** Day of month, e.g. 24. */
  date: number;
  /** Short weekday label, e.g. "Mon". */
  day: string;
  /** Whether this day is the current calendar day. */
  isToday: boolean;
  /** Full date key in "YYYY-MM-DD" format. */
  dateKey?: string;
}

/**
 * Onboarding results, used to personalize content across the app.
 */
export interface UserPreferences {
  /** Display name used in greetings. */
  name: string;
  /** Selected struggles, e.g. ["stress", "focus"]. */
  struggles: string[];
  /** Selected content categories, e.g. ["motivation", "mindfulness"]. */
  categories: string[];
  /** ISO timestamp marking onboarding completion. */
  onboardedAt: string;
}
