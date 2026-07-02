import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { typography } from "../theme/typography";

interface ScreenPlaceholderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
}

/**
 * Lightweight scaffold for screens that aren't built out yet. Keeps the
 * tab navigator fully functional while later steps fill in real content.
 */
export const ScreenPlaceholder: React.FC<ScreenPlaceholderProps> = ({
  title,
  subtitle = "Coming soon",
  emoji = "✨",
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    ...typography.bold,
    fontSize: 28,
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.medium,
    fontSize: 16,
    color: "#8A8A8A",
  },
});
