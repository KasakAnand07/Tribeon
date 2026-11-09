import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightColors, darkColors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? darkColors : lightColors;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>T</Text>
            </View>

            <Text style={[styles.brandName, { color: colors.textPrimary }]}>
              Tribeon
            </Text>
          </View>

          <Pressable
            onPress={() => setIsDark(!isDark)}
            style={[styles.themeButton, { backgroundColor: colors.surface }]}
          >
            <Text style={styles.themeIcon}>{isDark ? "☀️" : "🌙"}</Text>
            <Text style={[styles.themeText, { color: colors.textPrimary }]}>
              {isDark ? "Light" : "Dark"}
            </Text>
          </Pressable>
        </View>

        {/* Illustration */}
        <View style={styles.heroIllustration}>
          <View style={[styles.orbit, { borderColor: colors.accent }]} />

          <View
            style={[
              styles.person,
              styles.personLeft,
              { backgroundColor: "#F5C4B8" },
            ]}
          >
            <Text style={styles.personEmoji}>👩🏻</Text>
          </View>

          <View
            style={[
              styles.person,
              styles.personCenter,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.personEmoji}>👨🏻</Text>
          </View>

          <View
            style={[
              styles.person,
              styles.personRight,
              { backgroundColor: "#F4D28B" },
            ]}
          >
            <Text style={styles.personEmoji}>👩🏽</Text>
          </View>

          <View
            style={[
              styles.floatingCircle,
              styles.circleOne,
              { backgroundColor: colors.surfaceSecondary },
            ]}
          >
            <Text>✦</Text>
          </View>

          <View
            style={[
              styles.floatingCircle,
              styles.circleTwo,
              { backgroundColor: colors.surfaceSecondary },
            ]}
          >
            <Text>♡</Text>
          </View>
        </View>

        {/* Main heading */}
        <View style={styles.heroText}>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Find your people.
            {"\n"}
            Build together.
          </Text>

          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Discover communities, share your interests and connect with people
            who inspire you.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            onPress={() => navigation.navigate("Signup")}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={styles.secondaryButton}
          >
            <Text
              style={[styles.secondaryText, { color: colors.textSecondary }]}
            >
              Already have an account?
            </Text>
            <Text style={[styles.loginText, { color: colors.primary }]}>
              Log in
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
          CONNECT · COLLABORATE · GROW
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#635BDB",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { color: "#FFFFFF", fontSize: 25, fontWeight: "800" },
  brandName: { fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  themeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 7,
  },
  themeIcon: { fontSize: 15 },
  themeText: { fontSize: 12, fontWeight: "600" },
  heroIllustration: {
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  orbit: {
    width: 215,
    height: 175,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    position: "absolute",
    transform: [{ rotate: "-15deg" }],
  },
  person: {
    position: "absolute",
    width: 100,
    height: 115,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  personLeft: { left: "12%", top: 75 },
  personCenter: { zIndex: 2, top: 35, width: 115, height: 130 },
  personRight: { right: "12%", top: 75 },
  personEmoji: { fontSize: 57 },
  floatingCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  circleOne: { top: 20, left: "18%" },
  circleTwo: { right: "18%", top: 35 },
  heroText: { alignItems: "center", paddingHorizontal: 5 },
  heading: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -1,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 15,
    maxWidth: 310,
  },
  actions: { width: "100%", gap: 18 },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 21,
    position: "absolute",
    right: 20,
  },
  secondaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  secondaryText: { fontSize: 13 },
  loginText: { fontSize: 13, fontWeight: "700" },
  footer: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
});
