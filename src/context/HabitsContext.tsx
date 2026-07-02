import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DEFAULT_HABITS } from "../data/seed";
import { storage } from "../services/storage";
import { CompletionMap, Habit } from "../types";
import { fromDateKey, toDateKey, todayKey } from "../utils/date";

/** Input for creating a habit; id and createdAt are generated internally. */
export type NewHabit = Omit<Habit, "id" | "createdAt">;

interface HabitsContextValue {
  habits: Habit[];
  completions: CompletionMap;
  /** True while the initial load from storage is in flight. */
  loading: boolean;
  addHabit: (habit: NewHabit) => Habit;
  updateHabit: (id: string, changes: Partial<NewHabit>) => void;
  deleteHabit: (id: string) => void;
  /** Toggles a habit's completion for a given day (defaults to today). */
  toggleCompletion: (habitId: string, dateKey?: string) => void;
  isCompleted: (habitId: string, dateKey?: string) => boolean;
  /** Consecutive-day completion streak ending today for a habit. */
  getStreak: (habitId: string) => number;
}

const HabitsContext = createContext<HabitsContextValue | undefined>(undefined);

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<CompletionMap>({});
  const [loading, setLoading] = useState(true);
  // Skip persisting until the initial load has populated state.
  const hydrated = useRef(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const [loadedHabits, loadedCompletions, seeded] = await Promise.all([
        storage.loadHabits(),
        storage.loadCompletions(),
        storage.hasSeeded(),
      ]);
      if (!active) return;

      let initialHabits = loadedHabits;
      // First launch only: populate default habits, then never again.
      if (!seeded) {
        initialHabits = DEFAULT_HABITS.map((h) => ({
          ...h,
          id: generateId(),
          createdAt: new Date().toISOString(),
        }));
        storage.markSeeded();
      }

      setHabits(initialHabits);
      setCompletions(loadedCompletions);
      hydrated.current = true;
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (hydrated.current) storage.saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    if (hydrated.current) storage.saveCompletions(completions);
  }, [completions]);

  const addHabit = useCallback((habit: NewHabit): Habit => {
    const created: Habit = {
      ...habit,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, created]);
    return created;
  }, []);

  const updateHabit = useCallback((id: string, changes: Partial<NewHabit>) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...changes } : h)),
    );
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setCompletions((prev) => {
      const next: CompletionMap = {};
      for (const [dateKey, ids] of Object.entries(prev)) {
        const filtered = ids.filter((habitId) => habitId !== id);
        if (filtered.length > 0) next[dateKey] = filtered;
      }
      return next;
    });
  }, []);

  const toggleCompletion = useCallback(
    (habitId: string, dateKey: string = todayKey()) => {
      setCompletions((prev) => {
        const dayIds = prev[dateKey] ?? [];
        const isDone = dayIds.includes(habitId);
        const nextDayIds = isDone
          ? dayIds.filter((id) => id !== habitId)
          : [...dayIds, habitId];

        const next = { ...prev };
        if (nextDayIds.length > 0) next[dateKey] = nextDayIds;
        else delete next[dateKey];
        return next;
      });
    },
    [],
  );

  const isCompleted = useCallback(
    (habitId: string, dateKey: string = todayKey()) =>
      (completions[dateKey] ?? []).includes(habitId),
    [completions],
  );

  const getStreak = useCallback(
    (habitId: string): number => {
      let streak = 0;
      const cursor = new Date();
      cursor.setHours(0, 0, 0, 0);

      // Count consecutive days completed, walking backwards from today.
      while ((completions[toDateKey(cursor)] ?? []).includes(habitId)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
      return streak;
    },
    [completions],
  );

  const value = useMemo<HabitsContextValue>(
    () => ({
      habits,
      completions,
      loading,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleCompletion,
      isCompleted,
      getStreak,
    }),
    [
      habits,
      completions,
      loading,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleCompletion,
      isCompleted,
      getStreak,
    ],
  );

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
};

/** Access the habits store. Must be used within a HabitsProvider. */
export function useHabits(): HabitsContextValue {
  const ctx = useContext(HabitsContext);
  if (!ctx) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return ctx;
}

// Re-export so consumers can build week views aligned with stored keys.
export { fromDateKey };
