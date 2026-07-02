import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { usePreferences } from "../src/context/PreferencesContext";

/**
 * Entry gate: sends returning users straight to the app and new users
 * through onboarding.
 */
export default function Index() {
  const { loading, hasOnboarded } = usePreferences();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2B5CE6" />
      </View>
    );
  }

  return <Redirect href={hasOnboarded ? "/home" : "/onboarding"} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
});
