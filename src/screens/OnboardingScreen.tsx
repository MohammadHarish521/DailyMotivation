import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { OptionGrid } from "../components/OptionGrid";
import { usePreferences } from "../context/PreferencesContext";
import { CATEGORIES, STRUGGLES } from "../data/onboarding";
import { WelcomeScreen } from "./WelcomeScreen";

interface OnboardingScreenProps {
  /** Called once onboarding is complete and preferences are saved. */
  onDone: () => void;
}

// Steps after the welcome screen (index 0).
const TOTAL_STEPS = 4;

// Hoisted outside the component so these aren't reallocated on every render.
const SCROLL_CONTENT_STYLE = { flexGrow: 1, padding: 24, paddingTop: 32 };
const BACK_HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 };

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onDone,
}) => {
  const { completeOnboarding } = usePreferences();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [struggles, setStruggles] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = async () => {
    setSaving(true);
    await completeOnboarding({
      name: name.trim(),
      struggles,
      categories,
    });
    onDone();
  };

  // Step 0: reuse the branded welcome screen as the intro.
  if (step === 0) {
    return <WelcomeScreen onGetStarted={next} />;
  }

  const canContinue =
    (step === 1 && name.trim().length > 0) ||
    (step === 2 && struggles.length > 0) ||
    (step === 3 && categories.length > 0);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Progress dots */}
        <View className="flex-row justify-center gap-2 pt-4">
          {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
            <View
              key={i}
              className={`h-1.5 w-6 rounded-[3px] ${
                i + 1 <= step ? "bg-[#2B5CE6]" : "bg-[#E0E0E0]"
              }`}
            />
          ))}
        </View>

        <ScrollView
          contentContainerStyle={SCROLL_CONTENT_STYLE}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 1 && (
            <View>
              <Text className="mb-2 font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
                What should we call you?
              </Text>
              <Text className="mb-7 font-[Inter_500Medium] text-base leading-[22px] tracking-[-0.08px] text-[#8A8A8A]">
                We&apos;ll use this to greet you each day.
              </Text>
              <TextInput
                className="rounded-2xl border-2 border-[#EDEDED] bg-white px-5 py-4 font-[Inter_500Medium] text-lg tracking-[-0.08px] text-[#1A1A1A]"
                placeholder="Your name"
                placeholderTextColor="#B0B0B0"
                value={name}
                onChangeText={setName}
                autoFocus
                returnKeyType="next"
                maxLength={30}
                onSubmitEditing={() => name.trim() && next()}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text className="mb-2 font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
                What are you working on?
              </Text>
              <Text className="mb-7 font-[Inter_500Medium] text-base leading-[22px] tracking-[-0.08px] text-[#8A8A8A]">
                Pick anything you&apos;d like support with. Choose as many as
                you like.
              </Text>
              <OptionGrid
                options={STRUGGLES}
                selected={struggles}
                onToggle={(id) => setStruggles((prev) => toggle(prev, id))}
              />
            </View>
          )}

          {step === 3 && (
            <View>
              <Text className="mb-2 font-[Inter_700Bold] text-[28px] tracking-[-0.08px] text-[#1A1A1A]">
                Pick your categories
              </Text>
              <Text className="mb-7 font-[Inter_500Medium] text-base leading-[22px] tracking-[-0.08px] text-[#8A8A8A]">
                We&apos;ll tailor your daily quotes to these.
              </Text>
              <OptionGrid
                options={CATEGORIES}
                selected={categories}
                onToggle={(id) => setCategories((prev) => toggle(prev, id))}
              />
            </View>
          )}
        </ScrollView>

        {/* Footer nav */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            className="px-2 py-3"
            onPress={back}
            hitSlop={BACK_HIT_SLOP}
          >
            <Text className="font-[Inter_600SemiBold] text-base tracking-[-0.08px] text-[#8A8A8A]">
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`items-center rounded-[20px] px-10 py-4 ${
              !canContinue || saving ? "bg-[#BFCDF3]" : "bg-[#2B5CE6]"
            }`}
            onPress={step === 3 ? finish : next}
            disabled={!canContinue || saving}
            activeOpacity={0.85}
          >
            <Text className="font-[Inter_700Bold] text-base tracking-[-0.08px] text-white">
              {step === 3 ? (saving ? "Saving..." : "Get started") : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
