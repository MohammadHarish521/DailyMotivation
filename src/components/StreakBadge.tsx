import React from "react";
import { Text, View } from "react-native";

interface StreakBadgeProps {
  streak: number;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak }) => {
  return (
    <View className="flex-row items-center gap-1.5 rounded-2xl bg-[#FFF3D6] px-3.5 py-2">
      <Text className="text-base">🔥</Text>
      <Text className="font-[Inter_700Bold] text-base tracking-[-0.08px] text-[#1A1A1A]">
        {streak}
      </Text>
    </View>
  );
};
