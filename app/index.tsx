import { useRouter } from "expo-router";
import { WelcomeScreen } from "../src/screens/WelcomeScreen";

export default function Index() {
  const router = useRouter();

  return <WelcomeScreen onGetStarted={() => router.replace("/home")} />;
}
