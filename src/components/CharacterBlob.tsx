import React from "react";
import { View } from "react-native";

/**
 * One shared mascot body color across every habit card, regardless of the
 * card's background. Only expression + pose change per activity so all
 * three characters read as the same creature.
 */
export const MASCOT_COLOR = "#FFDD9E";
const MASCOT_SHADOW = "#F0C87A";

export type MascotActivity = "sleep" | "walk" | "meditate";

interface CharacterBlobProps {
  size?: number;
  activity?: MascotActivity;
}

export const CharacterBlob: React.FC<CharacterBlobProps> = ({
  size = 150,
  activity = "meditate",
}) => {
  const isSleep = activity === "sleep";
  const isWalk = activity === "walk";

  return (
    <View
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      <View
        className="relative items-center justify-center rounded-[20px]"
        style={{
          backgroundColor: MASCOT_COLOR,
          width: size,
          height: size * 0.8,
        }}
      >
        {/* Eyes */}
        {isSleep ? (
          <>
            <View className="absolute top-[35%] left-[30%] h-0.5 w-3 rounded-sm bg-black" />
            <View className="absolute top-[35%] right-[30%] h-0.5 w-3 rounded-sm bg-black" />
          </>
        ) : (
          <>
            <View className="absolute top-[35%] left-[30%] h-2 w-2 rounded-full bg-black" />
            <View className="absolute top-[35%] right-[30%] h-2 w-2 rounded-full bg-black" />
          </>
        )}

        {/* Mouth: calm smile for meditation, open happy smile for walk,
            small content mouth for sleep */}
        {isWalk && (
          <View className="absolute top-[55%] h-2.5 w-5 rounded-bl-[10px] rounded-br-[10px] border-b-2 border-b-black" />
        )}
        {!isWalk && !isSleep && (
          <View className="absolute top-[55%] h-0.5 w-4 rounded-sm bg-black" />
        )}
        {isSleep && (
          <View className="absolute top-[55%] h-1.5 w-2.5 rounded-full bg-black opacity-85" />
        )}

        {/* Cheeks give every pose the same friendly base look */}
        <View className="absolute top-[48%] left-[14%] h-1.5 w-2.5 rounded-full bg-[#FF9BCF] opacity-50" />
        <View className="absolute top-[48%] right-[14%] h-1.5 w-2.5 rounded-full bg-[#FF9BCF] opacity-50" />
      </View>

      {/* Arms: raised only in the walking pose to suggest motion */}
      {isWalk && (
        <>
          <View
            className="absolute top-[40%] -left-[15px] h-2 w-10 -rotate-[30deg] rounded-full"
            style={{ backgroundColor: MASCOT_COLOR }}
          />
          <View
            className="absolute top-[40%] -right-[15px] h-2 w-10 rotate-[30deg] rounded-full"
            style={{ backgroundColor: MASCOT_COLOR }}
          />
        </>
      )}

      {/* Legs: offset stride for walking, even stance otherwise */}
      <View className={`-mt-2.5 flex-row ${isWalk ? "gap-3" : "gap-5"}`}>
        <View
          className={`h-[30px] w-3 rounded-md ${
            isWalk ? "h-[34px] -translate-y-1 -rotate-[8deg]" : ""
          }`}
          style={{ backgroundColor: MASCOT_SHADOW }}
        />
        <View
          className={`h-[30px] w-3 rounded-md ${
            isWalk ? "h-[26px] translate-y-0.5 rotate-[10deg]" : ""
          }`}
          style={{ backgroundColor: MASCOT_SHADOW }}
        />
      </View>
    </View>
  );
};
