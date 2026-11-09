import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PostProvider } from "./src/context/PostContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { ProfileProvider } from "./src/context/ProfileContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { CommunityProvider } from "./src/context/CommunityContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileProvider>
          <CommunityProvider>
            <PostProvider>
              <StatusBar style="auto" />
              <AppNavigator />
            </PostProvider>
          </CommunityProvider>
        </ProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
