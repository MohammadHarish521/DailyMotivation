import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface QuoteCardProps {
  text: string;
  onRefresh: () => void;
  /** Briefly disables the refresh button to avoid rapid re-taps. */
  refreshing?: boolean;
  /** Whether the current quote is favorited; omit to hide the heart. */
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  /** Omit to hide the share button. */
  onShare?: () => void;
}

// forwardRef so the card's root view can be captured for sharing as an
// image (see src/utils/share.ts).
export const QuoteCard = forwardRef<View, QuoteCardProps>(
  (
    {
      text,
      onRefresh,
      refreshing = false,
      isFavorite,
      onToggleFavorite,
      onShare,
    },
    ref,
  ) => {
    return (
      <View
        ref={ref}
        collapsable={false}
        className="mb-6 rounded-3xl bg-[#1A1A1A] p-6"
      >
        <View className="mb-1 flex-row items-start justify-between">
          <Text className="-mb-2 font-[Inter_900Black] text-[40px] leading-[40px] tracking-[-0.08px] text-[#FFF885]">
            “
          </Text>
          <View className="flex-row gap-2">
            {onToggleFavorite && (
              <TouchableOpacity
                accessibilityLabel={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                onPress={onToggleFavorite}
                className="h-9 w-9 items-center justify-center rounded-full bg-white/10"
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={18}
                  color={isFavorite ? "#F2A0C6" : "#FFF"}
                />
              </TouchableOpacity>
            )}
            {onShare && (
              <TouchableOpacity
                accessibilityLabel="Share quote"
                onPress={onShare}
                className="h-9 w-9 items-center justify-center rounded-full bg-white/10"
                activeOpacity={0.7}
              >
                <Ionicons name="share-outline" size={18} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  },
);

QuoteCard.displayName = "QuoteCard";
