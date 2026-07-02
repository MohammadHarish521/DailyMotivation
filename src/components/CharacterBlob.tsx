import React from "react";
import { StyleSheet, View } from "react-native";

interface CharacterBlobProps {
  color: string;
  size?: number;
  face?: "happy" | "sleeping" | "calm";
  showArms?: boolean;
}

export const CharacterBlob: React.FC<CharacterBlobProps> = ({
  color,
  size = 150,
  face = "happy",
  showArms = false,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.blob,
          { backgroundColor: color, width: size, height: size * 0.8 },
        ]}
      >
        {/* Eyes */}
        {face === "sleeping" ? (
          <>
            <View style={[styles.eyeClosed, styles.leftEye]} />
            <View style={[styles.eyeClosed, styles.rightEye]} />
          </>
        ) : (
          <>
            <View style={[styles.eye, styles.leftEye]} />
            <View style={[styles.eye, styles.rightEye]} />
          </>
        )}

        {/* Mouth */}
        <View
          style={[
            styles.mouth,
            face === "happy" && styles.mouthHappy,
            face === "calm" && styles.mouthCalm,
          ]}
        />
      </View>

      {/* Arms */}
      {showArms && (
        <>
          <View
            style={[styles.arm, styles.leftArm, { backgroundColor: color }]}
          />
          <View
            style={[styles.arm, styles.rightArm, { backgroundColor: color }]}
          />
        </>
      )}

      {/* Legs */}
      <View style={styles.legs}>
        <View style={[styles.leg, { backgroundColor: color }]} />
        <View style={[styles.leg, { backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  blob: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  eye: {
    width: 8,
    height: 8,
    backgroundColor: "#000",
    borderRadius: 4,
    position: "absolute",
    top: "35%",
  },
  eyeClosed: {
    width: 12,
    height: 2,
    backgroundColor: "#000",
    borderRadius: 1,
    position: "absolute",
    top: "35%",
  },
  leftEye: {
    left: "30%",
  },
  rightEye: {
    right: "30%",
  },
  mouth: {
    width: 20,
    height: 10,
    position: "absolute",
    top: "55%",
  },
  mouthHappy: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mouthCalm: {
    width: 16,
    height: 2,
    backgroundColor: "#000",
    borderRadius: 1,
  },
  arm: {
    width: 40,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: "40%",
  },
  leftArm: {
    left: -15,
    transform: [{ rotate: "-30deg" }],
  },
  rightArm: {
    right: -15,
    transform: [{ rotate: "30deg" }],
  },
  legs: {
    flexDirection: "row",
    gap: 20,
    marginTop: -10,
  },
  leg: {
    width: 12,
    height: 30,
    borderRadius: 6,
  },
});
