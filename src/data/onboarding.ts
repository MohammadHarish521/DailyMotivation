export interface Option {
  /** Stable id stored in preferences. */
  id: string;
  /** User-facing label. */
  label: string;
  emoji: string;
}

/** "What are you struggling with?" quiz options. */
export const STRUGGLES: Option[] = [
  { id: "stress", label: "Stress", emoji: "😮‍💨" },
  { id: "focus", label: "Focus", emoji: "🎯" },
  { id: "procrastination", label: "Procrastination", emoji: "⏳" },
  { id: "self-doubt", label: "Self-doubt", emoji: "🌱" },
  { id: "burnout", label: "Burnout", emoji: "🔥" },
];

/** Content categories the user can subscribe to. */
export const CATEGORIES: Option[] = [
  { id: "motivation", label: "Motivation", emoji: "💪" },
  { id: "mindfulness", label: "Mindfulness", emoji: "🧘" },
  { id: "productivity", label: "Productivity", emoji: "⚡" },
  { id: "confidence", label: "Confidence", emoji: "✨" },
  { id: "gratitude", label: "Gratitude", emoji: "🙏" },
  { id: "positivity", label: "Positivity", emoji: "🌈" },
];
