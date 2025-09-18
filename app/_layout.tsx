import SafeAreaComponents from "@/components/SafeAreaComponents";
import { Slot } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaComponents>
        <Slot/>
      </SafeAreaComponents>
    </ClerkProvider>
  );
}
