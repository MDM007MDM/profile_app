import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Profile" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
      </Stack>
    </ThemeProvider>
  );
}