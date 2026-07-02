import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { storage } from "../services/storage";
import { UserPreferences } from "../types";

/** Onboarding input; onboardedAt is stamped on save. */
export type PreferencesInput = Omit<UserPreferences, "onboardedAt">;

interface PreferencesContextValue {
  preferences: UserPreferences | null;
  /** True while the initial load from storage is in flight. */
  loading: boolean;
  /** True once the user has completed onboarding. */
  hasOnboarded: boolean;
  /** Persists onboarding results and marks the user as onboarded. */
  completeOnboarding: (input: PreferencesInput) => Promise<void>;
  /** Updates a subset of stored preferences (no-op before onboarding). */
  updatePreferences: (changes: Partial<PreferencesInput>) => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined,
);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const loaded = await storage.loadPreferences();
      if (!active) return;
      setPreferences(loaded);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const completeOnboarding = useCallback(async (input: PreferencesInput) => {
    const next: UserPreferences = {
      ...input,
      onboardedAt: new Date().toISOString(),
    };
    setPreferences(next);
    await storage.savePreferences(next);
  }, []);

  const updatePreferences = useCallback(
    async (changes: Partial<PreferencesInput>) => {
      setPreferences((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...changes };
        storage.savePreferences(next);
        return next;
      });
    },
    [],
  );

  const value = useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      loading,
      hasOnboarded: preferences !== null,
      completeOnboarding,
      updatePreferences,
    }),
    [preferences, loading, completeOnboarding, updatePreferences],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

/** Access user preferences. Must be used within a PreferencesProvider. */
export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return ctx;
}
