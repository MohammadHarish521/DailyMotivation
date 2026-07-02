/**
 * Shared typography tokens for the app.
 * Font: Inter (loaded via @expo-google-fonts/inter in App.tsx)
 * Letter spacing: -0.08 across all text styles.
 */
export const letterSpacing = -0.08;

export const fontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  black: "Inter_900Black",
} as const;

export const typography = {
  regular: {
    fontFamily: fontFamily.regular,
    letterSpacing,
  },
  medium: {
    fontFamily: fontFamily.medium,
    letterSpacing,
  },
  semiBold: {
    fontFamily: fontFamily.semiBold,
    letterSpacing,
  },
  bold: {
    fontFamily: fontFamily.bold,
    letterSpacing,
  },
  black: {
    fontFamily: fontFamily.black,
    letterSpacing,
  },
} as const;
