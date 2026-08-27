import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <PaperProvider>
      <ConvexProvider client={convex}>
        <SafeAreaView>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaView>
      </ConvexProvider>
    </PaperProvider>
  );
}
