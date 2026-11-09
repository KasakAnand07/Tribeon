import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export default function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
}: CustomButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isPrimary ? "#635BDB" : "transparent",
          borderWidth: isPrimary ? 0 : 1,
          borderColor: "#635BDB",
          opacity: pressed || disabled ? 0.7 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#FFFFFF" : "#635BDB"} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: isPrimary ? "#FFFFFF" : "#636BDB" },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
});
