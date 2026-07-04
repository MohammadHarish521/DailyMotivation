import { DayInfo } from "../types";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Formats a Date into a stable "YYYY-MM-DD" key based on local time.
 */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns the "YYYY-MM-DD" key for the current day.
 */
export function todayKey(): string {
  return toDateKey(new Date());
}

/**
 * Parses a "YYYY-MM-DD" key back into a local Date at midnight.
 */
export function fromDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Returns the "YYYY-MM-DD" key for the day immediately before the given key.
 */
export function previousDateKey(key: string): string {
  const d = fromDateKey(key);
  d.setDate(d.getDate() - 1);
  return toDateKey(d);
}

/**
 * Builds a rolling window of days ending on today, driven by the real
 * current date. Defaults to the trailing 6 days plus today (7 total).
 */
export function buildWeek(count = 7, reference: Date = new Date()): DayInfo[] {
  const days: DayInfo[] = [];
  const today = new Date(reference);
  today.setHours(0, 0, 0, 0);
  const todayStr = toDateKey(today);

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateKey = toDateKey(d);
    days.push({
      date: d.getDate(),
      day: WEEKDAY_LABELS[d.getDay()],
      isToday: dateKey === todayStr,
      dateKey,
    });
  }

  return days;
}
