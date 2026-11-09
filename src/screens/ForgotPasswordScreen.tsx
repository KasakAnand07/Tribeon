import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    Alert.alert(
      "Request validated",
      "Password reset functionality will be connected to the backend later."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 12 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backButton}>← Back to Login</Text>
        </Pressable>

        <View style={styles.logo}>
          <Text style={styles.logoText}>T</Text>
        </View>

        <Text style={styles.brand}>Tribeon</Text>

        <View style={styles.headingContainer}>
          <Text style={styles.title}>Forgot password?</Text>
          <Text style={styles.subtitle}>
            Don't worry! Enter the email address associated
            with your account. We'll help you reset your password.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email address</Text>

          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            keyboardType="email-address"
            error={error}
          />

          <CustomButton
            title="Send Reset Link"
            onPress={handleSubmit}
          />
        </View>

        <Text style={styles.footer}>
          CONNECT · COLLABORATE · GROW
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 24,
  },

  backButton: {
    color: "#635BDB",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 45,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#635BDB",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 27,
    color: "#FFFFFF",
    fontWeight: "800",
  },

  brand: {
    fontSize: 22,
    color: "#17172B",
    fontWeight: "800",
    marginTop: 10,
  },

  headingContainer: {
    marginTop: 45,
    marginBottom: 30,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#17172B",
  },

  subtitle: {
    fontSize: 14,
    color: "#77778B",
    lineHeight: 22,
    marginTop: 10,
  },

  form: {
    gap: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#33334A",
  },

  footer: {
    color: "#9292A5",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 50,
  },
});
