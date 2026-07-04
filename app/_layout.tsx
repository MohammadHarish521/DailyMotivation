import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";
import { FavoritesProvider } from "../src/context/FavoritesContext";
import { HabitsProvider } from "../src/context/HabitsContext";
import { NotificationSettingsProvider } from "../src/context/NotificationSettingsContext";
import { PreferencesProvider } from "../src/context/PreferencesContext";
import { QuoteProvider } from "../src/context/QuoteContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <PreferencesProvider>
      <NotificationSettingsProvider>
        <QuoteProvider>
          <FavoritesProvider>
            <HabitsProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </HabitsProvider>
          </FavoritesProvider>
        </QuoteProvider>
      </NotificationSettingsProvider>
    </PreferencesProvider>
  );
}
