import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CharacterBlob } from "../components/CharacterBlob";
import { typography } from "../theme/typography";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Decorative circles */}
        <View style={[styles.circle, styles.circleTopLeft]} />
        <View style={[styles.circle, styles.circleTopRight]} />
        <View style={[styles.circle, styles.circleMid]} />
        <View style={[styles.circle, styles.circleBottomLeft]} />

        <Text style={styles.title}>
          GO FOR BETTER{"\n"}HABITS WITH{"\n"}CHARMI
        </Text>

        {/* Speech bubbles */}
        <View style={styles.bubbleContainer}>
          <View style={[styles.bubble, styles.bubbleBlue]}>
            <Text style={styles.bubbleText}>Let's start!</Text>
          </View>
          <View style={[styles.bubble, styles.bubbleYellow]}>
            <Text style={styles.bubbleText}>Hello!</Text>
          </View>
        </View>

        {/* Character */}
        <View style={styles.characterContainer}>
          <CharacterBlob color="#D4F4DD" size={200} face="happy" showArms />
        </View>

        <TouchableOpacity style={styles.button} onPress={onGetStarted}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B5CE6",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  circle: {
    position: "absolute",
    borderRadius: 1000,
    opacity: 0.3,
  },
  circleTopLeft: {
    width: 80,
    height: 80,
    backgroundColor: "#A8D5FF",
    top: 60,
    left: 20,
  },
  circleTopRight: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    top: 100,
    right: 60,
  },
  circleMid: {
    width: 60,
    height: 60,
    backgroundColor: "#FF9BCF",
    top: "40%",
    right: 30,
  },
  circleBottomLeft: {
    width: 100,
    height: 100,
    backgroundColor: "#A8D5FF",
    bottom: "30%",
    left: -30,
  },
  title: {
    ...typography.black,
    fontSize: 36,
    color: "#D4F4DD",
    marginTop: 60,
    lineHeight: 44,
  },
  bubbleContainer: {
    position: "absolute",
    top: "25%",
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: "45%",
  },
  bubbleBlue: {
    backgroundColor: "#A8D5FF",
  },
  bubbleYellow: {
    backgroundColor: "#FFF885",
  },
  bubbleText: {
    ...typography.bold,
    fontSize: 16,
    color: "#1A1A1A",
  },
  characterContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  button: {
    backgroundColor: "#D4F4DD",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    ...typography.bold,
    fontSize: 18,
    color: "#1A1A1A",
  },
});
