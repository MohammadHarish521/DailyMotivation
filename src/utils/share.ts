import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { captureRef } from "react-native-view-shot";

/**
 * Captures the given view ref as a PNG and opens the native share sheet.
 * Falls back to a friendly alert if sharing isn't available on the
 * platform (e.g. web without HTTPS) or the capture/share fails.
 */
export async function shareViewAsImage(
  viewRef: React.RefObject<any>,
): Promise<void> {
  try {
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert(
        "Sharing unavailable",
        "Sharing isn't supported on this device.",
      );
      return;
    }

    const uri = await captureRef(viewRef, {
      format: "png",
      quality: 1,
    });
    await Sharing.shareAsync(uri, { mimeType: "image/png" });
  } catch (err) {
    console.warn("Failed to share image:", err);
    Alert.alert("Couldn't share", "Something went wrong while sharing.");
  }
}
