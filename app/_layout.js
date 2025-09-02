import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeContext";
import { AuthProvider } from "../auth/AuthContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Profile" }} />
          <Stack.Screen name="about" options={{ title: "About" }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}