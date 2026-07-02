/**
 * Returns a time-of-day greeting: "Good Morning", "Good Afternoon", or
 * "Good Evening" based on the current local hour.
 */
export function useTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}
