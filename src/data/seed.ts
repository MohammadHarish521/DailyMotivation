import { NewHabit } from "../context/HabitsContext";

/**
 * Default habits inserted on first launch so a brand-new user sees a
 * populated home screen. Once persisted, edits/deletes are respected and
 * these are never re-seeded.
 */
export const DEFAULT_HABITS: NewHabit[] = [
  {
    title: "Sleep for 8 hours",
    duration: "Everyday",
    frequency: "",
    color: "#D4F4DD",
  },
  {
    title: "Go for a walk",
    duration: "25 min",
    frequency: "",
    color: "#FFB3D9",
  },
  {
    title: "Meditation",
    duration: "15 min",
    frequency: "",
    color: "#A8D5FF",
  },
];
