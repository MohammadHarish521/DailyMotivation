import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  cancelDailyReminder,
  requestNotificationPermission,
  scheduleDailyReminder,
} from "../services/notifications";
import { storage } from "../services/storage";
import { NotificationSettings } from "../types";

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  hour: 9,
  minute: 0,
};

interface NotificationSettingsContextValue {
  settings: NotificationSettings;
  loading: boolean;
  /**
   * Enables the daily reminder at the given time (defaults to the current
   * setting's time). Requests permission first; if denied, settings are
   * left unchanged and this returns false.
   */
  enableReminder: (time?: { hour: number; minute: number }) => Promise<boolean>;
  disableReminder: () => Promise<void>;
  /** Updates the reminder time, rescheduling if currently enabled. */
  setReminderTime: (hour: number, minute: number) => Promise<void>;
}

const NotificationSettingsContext = createContext<
  NotificationSettingsContextValue | undefined
>(undefined);

export const NotificationSettingsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [settings, setSettings] =
    useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const loaded = await storage.loadNotificationSettings();
      if (!active) return;
      if (loaded) {
        setSettings(loaded);
        // Re-assert the schedule on launch in case the OS cleared it
        // (e.g. after an app update or device restart edge case).
        if (loaded.enabled) scheduleDailyReminder(loaded);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback(async (next: NotificationSettings) => {
    setSettings(next);
    await storage.saveNotificationSettings(next);
  }, []);

  const enableReminder = useCallback(
    async (time?: { hour: number; minute: number }): Promise<boolean> => {
      const granted = await requestNotificationPermission();
      if (!granted) return false;

      const next: NotificationSettings = {
        enabled: true,
        hour: time?.hour ?? settings.hour,
        minute: time?.minute ?? settings.minute,
      };
      await persist(next);
      await scheduleDailyReminder(next);
      return true;
    },
    [settings.hour, settings.minute, persist],
  );

  const disableReminder = useCallback(async () => {
    const next: NotificationSettings = { ...settings, enabled: false };
    await persist(next);
    await cancelDailyReminder();
  }, [settings, persist]);

  const setReminderTime = useCallback(
    async (hour: number, minute: number) => {
      const next: NotificationSettings = { ...settings, hour, minute };
      await persist(next);
      if (next.enabled) await scheduleDailyReminder(next);
    },
    [settings, persist],
  );

  const value = useMemo<NotificationSettingsContextValue>(
    () => ({
      settings,
      loading,
      enableReminder,
      disableReminder,
      setReminderTime,
    }),
    [settings, loading, enableReminder, disableReminder, setReminderTime],
  );

  return (
    <NotificationSettingsContext.Provider value={value}>
      {children}
    </NotificationSettingsContext.Provider>
  );
};

/** Access daily reminder settings. Must be used within the provider. */
export function useNotificationSettings(): NotificationSettingsContextValue {
  const ctx = useContext(NotificationSettingsContext);
  if (!ctx) {
    throw new Error(
      "useNotificationSettings must be used within a NotificationSettingsProvider",
    );
  }
  return ctx;
}
