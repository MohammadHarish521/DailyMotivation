import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { OptionGrid } from "../components/OptionGrid";
import { usePreferences } from "../context/PreferencesContext";
import { CATEGORIES, STRUGGLES } from "../data/onboarding";
import { typography } from "../theme/typography";
import { WelcomeScreen } from "./WelcomeScreen";

interface OnboardingScreenProps {
  /** Called once onboarding is complete and preferences are saved. */
  onDone: () => void;
}

// Steps after the welcome screen (index 0).
const TOTAL_STEPS = 4;

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onDone,
}) => {
  const { completeOnboarding } = usePreferences();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [struggles, setStruggles] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const toggle = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Progress dots */}
        <View style={styles.progress}>
          {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i + 1 <= step && styles.dotActive]}
            />
          ))}
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 1 && (
            <View>
              <Text style={styles.title}>What should we call you?</Text>
              <Text style={styles.subtitle}>
                We'll use this to greet you each day.
              </Text>
              <TextInput
                style={styles.input}
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
              <Text style={styles.title}>What are you working on?</Text>
              <Text style={styles.subtitle}>
                Pick anything you'd like support with. Choose as many as you
                like.
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
              <Text style={styles.title}>Pick your categories</Text>
              <Text style={styles.subtitle}>
                We'll tailor your daily quotes to these.
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
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={back}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              (!canContinue || saving) && styles.nextButtonDisabled,
            ]}
            onPress={step === 3 ? finish : next}
            disabled={!canContinue || saving}
            activeOpacity={0.85}
          >
            <Text style={styles.nextText}>
              {step === 3 ? (saving ? "Saving..." : "Get started") : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  flex: {
    flex: 1,
  },
  progress: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingTop: 16,
  },
  dot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },
  dotActive: {
    backgroundColor: "#2B5CE6",
  },
  content: {
    padding: 24,
    paddingTop: 32,
    flexGrow: 1,
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
    marginBottom: 28,
    lineHeight: 22,
  },
  input: {
    ...typography.medium,
    fontSize: 18,
    color: "#1A1A1A",
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#EDEDED",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  backText: {
    ...typography.semiBold,
    fontSize: 16,
    color: "#8A8A8A",
  },
  nextButton: {
    backgroundColor: "#2B5CE6",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#BFCDF3",
  },
  nextText: {
    ...typography.bold,
    fontSize: 16,
    color: "#FFF",
  },
});
