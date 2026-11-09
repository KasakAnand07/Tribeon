import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from "react-native";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailPattern.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            // { paddingTop: insets.top + 12 },
            { paddingTop: 12 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>T</Text>
            </View>
            <Text style={styles.brand}>Tribeon</Text>
          </View>

          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.title}>Welcome back!</Text>
            <Text style={styles.subtitle}>
              Log in to reconnect with your communities and continue where you
              left off.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Email address</Text>

              <CustomInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                keyboardType="email-address"
                error={errors.email}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>

              <CustomInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                secureTextEntry={!showPassword}
                onToggleSecure={() => setShowPassword(!showPassword)}
                error={errors.password}
              />
            </View>
          </View>

          {/* Remember me and forgot password */}
          <View style={styles.options}>
            <Pressable
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxSelected]}
              >
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <Text style={styles.rememberText}>Remember me</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          </View>

          {/* Login button */}
          <View style={styles.actions}>
            <CustomButton title="Log In" onPress={handleLogin} />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Registration */}
          <View style={styles.signupRow}>
            <Text style={styles.signupLabel}>Don't have an account?</Text>

            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupLink}>Sign up</Text>
            </Pressable>
          </View>

          <Text style={styles.footer}>CONNECT · COLLABORATE · GROW</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 55,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#635BDB",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  brand: {
    color: "#17172B",
    fontSize: 22,
    fontWeight: "800",
  },

  headingContainer: {
    marginBottom: 38,
  },

  title: {
    fontSize: 30,
    color: "#17172B",
    fontWeight: "800",
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: 14,
    color: "#77778B",
    lineHeight: 22,
    marginTop: 10,
  },

  form: {
    gap: 22,
  },

  field: {
    gap: 9,
  },

  label: {
    color: "#33334A",
    fontSize: 13,
    fontWeight: "700",
  },

  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#C9C9D7",
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxSelected: {
    backgroundColor: "#635BDB",
    borderColor: "#635BDB",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  rememberText: {
    fontSize: 12,
    color: "#77778B",
  },

  forgotText: {
    color: "#635BDB",
    fontSize: 12,
    fontWeight: "700",
  },

  actions: {
    marginTop: 35,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 30,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5EF",
  },

  orText: {
    fontSize: 11,
    color: "#9292A5",
    fontWeight: "600",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  signupLabel: {
    fontSize: 13,
    color: "#77778B",
  },

  signupLink: {
    fontSize: 13,
    color: "#635BDB",
    fontWeight: "700",
  },

  footer: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#9292A5",
    textAlign: "center",
    marginTop: 55,
  },
});
