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

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailPattern.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validateForm()) {
      return;
    }

    Alert.alert(
      "Form validated!",
      "Your details are ready. Backend registration will be connected next.",
    );
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>T</Text>
            </View>

            <Text style={styles.brand}>Tribeon</Text>
          </View>

          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.title}>Create your account</Text>

            <Text style={styles.subtitle}>
              Join Tribeon and become part of a community that shares your
              interests.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Full name</Text>

              <CustomInput
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                autoCapitalize="words"
                error={errors.fullName}
              />
            </View>

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
                placeholder="Create a password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                secureTextEntry={!showPassword}
                onToggleSecure={() => setShowPassword(!showPassword)}
                error={errors.password}
              />
              <Text style={styles.helperText}>Use at least 8 characters.</Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Confirm password</Text>

              <CustomInput
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "",
                  }));
                }}
                secureTextEntry={!showConfirmPassword}
                onToggleSecure={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={errors.confirmPassword}
              />
            </View>
          </View>

          {/* Submit */}
          <View style={styles.actions}>
            <CustomButton title="Create Account" onPress={handleSignup} />

            <View style={styles.loginRow}>
              <Text style={styles.loginLabel}>Already have an account?</Text>

              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Log in</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
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
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 35,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#635BDB",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "800",
  },

  brand: {
    fontSize: 22,
    color: "#17172B",
    fontWeight: "800",
  },

  headingContainer: {
    marginBottom: 28,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#17172B",
    letterSpacing: -0.6,
  },

  subtitle: {
    fontSize: 14,
    color: "#77778B",
    lineHeight: 22,
    marginTop: 9,
  },

  form: {
    gap: 19,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#33334A",
  },

  helperText: {
    color: "#9292A5",
    fontSize: 11,
    marginLeft: 4,
  },

  actions: {
    marginTop: 30,
    gap: 20,
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  loginLabel: {
    color: "#77778B",
    fontSize: 13,
  },

  loginLink: {
    color: "#635BDB",
    fontWeight: "700",
    fontSize: 13,
  },

  footer: {
    color: "#9292A5",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 35,
  },
});
