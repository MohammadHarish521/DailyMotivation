import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Same pastel family used across seeded habit cards, so user-created
// habits blend in with the defaults.
const COLOR_OPTIONS = [
  "#D4F4DD",
  "#F2A0C6",
  "#A8D5FF",
  "#FFF3D6",
  "#E5D4F4",
  "#FFD9C2",
];

export interface AddHabitFormValues {
  title: string;
  duration: string;
  frequency: string;
  color: string;
}

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: AddHabitFormValues) => void;
}

const DEFAULT_VALUES: AddHabitFormValues = {
  title: "",
  duration: "",
  frequency: "Everyday",
  color: COLOR_OPTIONS[0],
};

/**
 * Bottom-sheet-style form for creating a new habit. Kept intentionally
 * simple: title is required, duration/frequency are free-text labels
 * (matching how they're rendered on HabitCard), color picks from the same
 * pastel palette as the seeded habits.
 */
export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = useState<AddHabitFormValues>(DEFAULT_VALUES);

  // Reset the form each time the modal is (re)opened.
  useEffect(() => {
    if (visible) setValues(DEFAULT_VALUES);
  }, [visible]);

  const canSubmit = values.title.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ ...values, title: values.title.trim() });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="rounded-t-3xl bg-white p-6 pb-8">
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="font-[Inter_700Bold] text-xl tracking-[-0.08px] text-[#1A1A1A]">
                New habit
              </Text>
              <TouchableOpacity onPress={onClose} accessibilityLabel="Close">
                <Ionicons name="close" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <Text className="mb-1.5 font-[Inter_600SemiBold] text-sm tracking-[-0.08px] text-[#8A8A8A]">
              Title
            </Text>
            <TextInput
              className="mb-4 rounded-2xl border-2 border-[#EDEDED] px-4 py-3 font-[Inter_500Medium] text-base text-[#1A1A1A]"
              placeholder="e.g. Drink water"
              placeholderTextColor="#B0B0B0"
              value={values.title}
              onChangeText={(title) => setValues((v) => ({ ...v, title }))}
              autoFocus
              maxLength={40}
            />

            <View className="mb-4 flex-row gap-3">
              <View className="flex-1">
                <Text className="mb-1.5 font-[Inter_600SemiBold] text-sm tracking-[-0.08px] text-[#8A8A8A]">
                  Duration
                </Text>
                <TextInput
                  className="rounded-2xl border-2 border-[#EDEDED] px-4 py-3 font-[Inter_500Medium] text-base text-[#1A1A1A]"
                  placeholder="e.g. 15 min"
                  placeholderTextColor="#B0B0B0"
                  value={values.duration}
                  onChangeText={(duration) =>
                    setValues((v) => ({ ...v, duration }))
                  }
                  maxLength={20}
                />
              </View>
              <View className="flex-1">
                <Text className="mb-1.5 font-[Inter_600SemiBold] text-sm tracking-[-0.08px] text-[#8A8A8A]">
                  Frequency
                </Text>
                <TextInput
                  className="rounded-2xl border-2 border-[#EDEDED] px-4 py-3 font-[Inter_500Medium] text-base text-[#1A1A1A]"
                  placeholder="e.g. Everyday"
                  placeholderTextColor="#B0B0B0"
                  value={values.frequency}
                  onChangeText={(frequency) =>
                    setValues((v) => ({ ...v, frequency }))
                  }
                  maxLength={20}
                />
              </View>
            </View>

            <Text className="mb-2 font-[Inter_600SemiBold] text-sm tracking-[-0.08px] text-[#8A8A8A]">
              Color
            </Text>
            <View className="mb-6 flex-row gap-3">
              {COLOR_OPTIONS.map((color) => {
                const isSelected = values.color === color;
                return (
                  <TouchableOpacity
                    key={color}
                    accessibilityLabel={`Select color ${color}`}
                    onPress={() => setValues((v) => ({ ...v, color }))}
                    className="h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: color,
                      borderWidth: isSelected ? 3 : 0,
                      borderColor: "#1A1A1A",
                    }}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color="#1A1A1A" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              className={`items-center rounded-2xl py-4 ${
                canSubmit ? "bg-[#1A1A1A]" : "bg-[#EDEDED]"
              }`}
              onPress={handleSubmit}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              <Text
                className={`font-[Inter_700Bold] text-base tracking-[-0.08px] ${
                  canSubmit ? "text-white" : "text-[#B0B0B0]"
                }`}
              >
                Add habit
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
