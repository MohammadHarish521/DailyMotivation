import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface QuoteCardProps {
  text: string;
  onRefresh: () => void;
  /** Briefly disables the refresh button to avoid rapid re-taps. */
  refreshing?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  text,
  onRefresh,
  refreshing = false,
}) => {
  return (
    <View className="mb-6 rounded-3xl bg-[#1A1A1A] p-6">
      <Text className="-mb-2 font-[Inter_900Black] text-[40px] leading-[40px] tracking-[-0.08px] text-[#FFF885]">
        “
      </Text>
      <Text className="mb-5 font-[Inter_600SemiBold] text-xl leading-7 tracking-[-0.08px] text-white">
        {text}
      </Text>

      <TouchableOpacity
        className="min-w-[100px] items-center self-start rounded-2xl bg-[#FFF885] px-4 py-2.5"
        onPress={onRefresh}
        disabled={refreshing}
        activeOpacity={0.8}
      >
        {refreshing ? (
          <ActivityIndicator size="small" color="#1A1A1A" />
        ) : (
          <Text className="font-[Inter_700Bold] text-sm tracking-[-0.08px] text-[#1A1A1A]">
            New quote ↻
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
