import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

interface ScreenPlaceholderProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

/**
 * Lightweight scaffold for screens that aren't built out yet. Keeps the
 * tab navigator fully functional while later steps fill in real content.
 */
export const ScreenPlaceholder: React.FC<ScreenPlaceholderProps> = ({
  title,
  subtitle = "Coming soon",
  icon = "sparkles-outline",
}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <View className="flex-1 items-center justify-center p-6">
        <Ionicons
          name={icon}
          size={48}
          color="#1A1A1A"
          style={{ marginBottom: 16 }}
        />
        <Text className="mb-2 font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
          {title}
        </Text>
        <Text className="font-[Inter_500Medium] text-base tracking-[-0.08px] text-[#8A8A8A]">
          {subtitle}
        </Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
