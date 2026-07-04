import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { CharacterBlob } from "../components/CharacterBlob";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#2B5CE6]">
      <View className="flex-1 justify-between p-6">
        {/* Decorative circles */}
        <View className="absolute left-5 top-[60px] h-20 w-20 rounded-full bg-[#A8D5FF] opacity-30" />
        <View className="absolute right-[60px] top-[100px] h-10 w-10 rounded-full bg-white opacity-30" />
        <View className="absolute right-[30px] top-[40%] h-[60px] w-[60px] rounded-full bg-[#FF9BCF] opacity-30" />
        <View className="absolute -left-[30px] bottom-[30%] h-[100px] w-[100px] rounded-full bg-[#A8D5FF] opacity-30" />

        <Text className="mt-[60px] font-[Inter_900Black] text-4xl leading-[44px] tracking-[-0.08px] text-[#D4F4DD]">
          GO FOR BETTER{"\n"}HABITS WITH{"\n"}CHARMI
        </Text>

        {/* Speech bubbles */}
        <View className="absolute left-6 right-6 top-[25%] flex-row justify-around">
          <View className="max-w-[45%] rounded-2xl bg-[#A8D5FF] p-4">
            <Text className="font-[Inter_700Bold] text-base tracking-[-0.08px] text-[#1A1A1A]">
              Let&apos;s start!
            </Text>
          </View>
          <View className="max-w-[45%] rounded-2xl bg-[#FFF885] p-4">
            <Text className="font-[Inter_700Bold] text-base tracking-[-0.08px] text-[#1A1A1A]">
              Hello!
            </Text>
          </View>
        </View>

        {/* Character */}
        <View className="my-10 items-center">
          <CharacterBlob size={200} activity="walk" />
        </View>

        <TouchableOpacity
          className="mb-10 items-center rounded-[20px] bg-[#D4F4DD] p-5"
          onPress={onGetStarted}
        >
          <Text className="font-[Inter_700Bold] text-lg tracking-[-0.08px] text-[#1A1A1A]">
            Get started
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};
