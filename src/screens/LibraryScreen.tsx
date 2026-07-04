import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { QUOTES } from "../data/quotes";
import { shareViewAsImage } from "../utils/share";

export const LibraryScreen: React.FC = () => {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const favoriteQuotes = useMemo(
    () => QUOTES.filter((q) => favoriteIds.includes(q.id)),
    [favoriteIds],
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 pb-[100px]">
          <Text className="mb-6 font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
            Library
          </Text>

          {favoriteQuotes.length === 0 ? (
            <View className="items-center justify-center rounded-3xl bg-white p-10">
              <Ionicons
                name="heart-outline"
                size={40}
                color="#1A1A1A"
                style={{ marginBottom: 12 }}
              />
              <Text className="mb-1 font-[Inter_700Bold] text-lg tracking-[-0.08px] text-[#1A1A1A]">
                No favorites yet
              </Text>
              <Text className="text-center font-[Inter_500Medium] text-sm tracking-[-0.08px] text-[#8A8A8A]">
                Tap the heart on a quote to save it here.
              </Text>
            </View>
          ) : (
            favoriteQuotes.map((quote) => (
              <FavoriteQuoteCard
                key={quote.id}
                text={quote.text}
                onRemove={() => toggleFavorite(quote.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const FavoriteQuoteCard: React.FC<{ text: string; onRemove: () => void }> = ({
  text,
  onRemove,
}) => {
  const cardRef = useRef<View>(null);

  return (
    <View
      ref={cardRef}
      collapsable={false}
      className="mb-4 rounded-3xl bg-[#1A1A1A] p-5"
    >
      <View className="mb-3 flex-row items-start justify-between">
        <Text className="mr-3 flex-1 font-[Inter_600SemiBold] text-base leading-6 tracking-[-0.08px] text-white">
          {text}
        </Text>
        <View className="flex-row gap-2">
          <TouchableOpacity
            accessibilityLabel="Share quote"
            onPress={() => shareViewAsImage(cardRef)}
            className="h-8 w-8 items-center justify-center rounded-full bg-white/10"
            activeOpacity={0.7}
          >
            <Ionicons name="share-outline" size={16} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Remove from favorites"
            onPress={onRemove}
            className="h-8 w-8 items-center justify-center rounded-full bg-white/10"
            activeOpacity={0.7}
          >
            <Ionicons name="heart" size={16} color="#F2A0C6" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
