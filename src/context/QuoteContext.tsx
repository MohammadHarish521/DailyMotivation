import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { QUOTES } from "../data/quotes";
import { storage } from "../services/storage";
import { Quote, StreakState } from "../types";
import { previousDateKey, todayKey } from "../utils/date";
import { usePreferences } from "./PreferencesContext";

interface QuoteContextValue {
  /** Today's featured quote, stable across app opens until refreshed. */
  quote: Quote | null;
  /** Current consecutive-day streak of opening the app. */
  streak: number;
  loading: boolean;
  /** Picks a new random quote for today (used by the refresh button / pull-to-refresh). */
  getNewQuote: () => void;
}

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

/**
 * Picks a random quote, weighted toward the user's onboarding categories
 * and struggles when available. Avoids repeating the given id when
 * possible.
 */
function pickQuote(interests: string[], avoidId?: string): Quote {
  const pool =
    interests.length > 0
      ? QUOTES.filter((q) => q.categories.some((c) => interests.includes(c)))
      : QUOTES;

  const candidates = (pool.length > 0 ? pool : QUOTES).filter(
    (q) => q.id !== avoidId,
  );
  const finalPool = candidates.length > 0 ? candidates : QUOTES;

  return finalPool[Math.floor(Math.random() * finalPool.length)];
}

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { preferences } = usePreferences();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const hydrated = useRef(false);

  const interests = useMemo(
    () => [
      ...(preferences?.struggles ?? []),
      ...(preferences?.categories ?? []),
    ],
    [preferences?.struggles, preferences?.categories],
  );

  useEffect(() => {
    let active = true;
    (async () => {
      const [storedQuoteState, storedStreak] = await Promise.all([
        storage.loadQuoteState(),
        storage.loadStreak(),
      ]);
      if (!active) return;

      const today = todayKey();

      // Resolve today's quote: reuse if already picked today, else pick fresh.
      let resolvedQuote: Quote;
      if (storedQuoteState?.dateKey === today) {
        resolvedQuote =
          QUOTES.find((q) => q.id === storedQuoteState.quoteId) ??
          pickQuote(interests);
      } else {
        resolvedQuote = pickQuote(interests);
        storage.saveQuoteState({ quoteId: resolvedQuote.id, dateKey: today });
      }

      // Resolve streak: bump once per new day, reset if a day was missed.
      let nextStreak: StreakState;
      if (!storedStreak) {
        nextStreak = { count: 1, lastActiveDateKey: today };
      } else if (storedStreak.lastActiveDateKey === today) {
        nextStreak = storedStreak;
      } else if (storedStreak.lastActiveDateKey === previousDateKey(today)) {
        nextStreak = {
          count: storedStreak.count + 1,
          lastActiveDateKey: today,
        };
      } else {
        nextStreak = { count: 1, lastActiveDateKey: today };
      }
      if (nextStreak !== storedStreak) storage.saveStreak(nextStreak);

      setQuote(resolvedQuote);
      setStreak(nextStreak.count);
      hydrated.current = true;
      setLoading(false);
    })();
    return () => {
      active = false;
    };
    // Intentionally run once on mount; interests changing mid-session
    // shouldn't retroactively rewrite today's already-picked quote.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNewQuote = useCallback(() => {
    const next = pickQuote(interests, quote?.id);
    setQuote(next);
    storage.saveQuoteState({ quoteId: next.id, dateKey: todayKey() });
  }, [interests, quote?.id]);

  const value = useMemo<QuoteContextValue>(
    () => ({ quote, streak, loading, getNewQuote }),
    [quote, streak, loading, getNewQuote],
  );

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};

/** Access today's quote and streak. Must be used within a QuoteProvider. */
export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return ctx;
}
