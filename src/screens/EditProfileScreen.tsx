
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";
import { useProfile } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

type Props = NativeStackScreenProps<ProfileStackParamList, "EditProfile">;

export default function EditProfileScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [skills, setSkills] = useState(profile.skills);
  const [interests, setInterests] = useState(profile.interests);

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    heading: {
      color: colors.textPrimary,
    },
    subtitle: {
      color: colors.textSecondary,
    },
    cancelButton: {
      backgroundColor: colors.surfaceSecondary,
    },
    cancelText: {
      color: colors.primary,
    },
    avatar: {
      backgroundColor: colors.surfaceSecondary,
    },
    avatarText: {
      color: colors.primary,
    },
    avatarNote: {
      color: colors.textSecondary,
    },
    sectionTitle: {
      color: colors.textPrimary,
    },
    sectionSubtitle: {
      color: colors.textSecondary,
    },
    label: {
      color: colors.textPrimary,
    },
    input: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.textPrimary,
    },
    usernameInput: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    usernameTextInput: {
      color: colors.textPrimary,
    },
    atSymbol: {
      color: colors.textSecondary,
    },
    helperText: {
      color: colors.textSecondary,
    },
    characterCount: {
      color: colors.textSecondary,
    },
    chip: {
      backgroundColor: colors.surfaceSecondary,
    },
    chipText: {
      color: colors.primary,
    },
    addInput: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.textPrimary,
    },
    footer: {
      color: colors.textSecondary,
    },
  });

  const addSkill = () => {
    const value = newSkill.trim();

    if (!value) return;

    if (skills.some((item) => item.toLowerCase() === value.toLowerCase())) {
      Alert.alert("Already added", "This skill is already in your list.");
      return;
    }

    setSkills((previous) => [...previous, value]);
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setSkills((previous) => previous.filter((item) => item !== skill));
  };

  const addInterest = () => {
    const value = newInterest.trim();

    if (!value) return;

    if (interests.some((item) => item.toLowerCase() === value.toLowerCase())) {
      Alert.alert("Already added", "This interest is already in your list.");
      return;
    }

    setInterests((previous) => [...previous, value]);
    setNewInterest("");
  };

  const removeInterest = (interest: string) => {
    setInterests((previous) => previous.filter((item) => item !== interest));
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Missing name", "Please enter your full name.");
      return;
    }

    if (!username.trim()) {
      Alert.alert("Missing username", "Please enter a username.");
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
      Alert.alert(
        "Invalid username",
        "Use 3–20 characters: letters, numbers or underscores."
      );
      return;
    }

    updateProfile({
      name: name.trim(),
      username: username.trim(),
      bio: bio.trim(),
      skills,
      interests,
    });

    Alert.alert(
      "Profile updated",
      "Your profile changes have been applied.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const renderChips = (
    items: string[],
    onRemove: (item: string) => void
  ) => (
    <View style={styles.chipContainer}>
      {items.map((item) => (
        <View style={[styles.chip, dynamicStyles.chip]} key={item}>
          <Text style={[styles.chipText, dynamicStyles.chipText]}>
            {item}
          </Text>

          <Pressable onPress={() => onRemove(item)} hitSlop={8}>
            <Ionicons
              name="close-circle"
              size={17}
              color={colors.primary}
            />
          </Pressable>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.heading, dynamicStyles.heading]}>
                Edit Profile
              </Text>

              <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                Keep your profile up to date.
              </Text>
            </View>

            <Pressable
              style={[styles.cancelButton, dynamicStyles.cancelButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.cancelText, dynamicStyles.cancelText]}>
                Cancel
              </Text>
            </Pressable>
          </View>

          {/* Profile Picture */}
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, dynamicStyles.avatar]}>
              <Text style={[styles.avatarText, dynamicStyles.avatarText]}>
                {name.trim().charAt(0).toUpperCase() || "?"}
              </Text>
            </View>

            <Text style={[styles.avatarNote, dynamicStyles.avatarNote]}>
              Profile photo selection will be added later.
            </Text>
          </View>

          {/* Personal Information */}
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            Personal information
          </Text>

          <View style={styles.field}>
            <Text style={[styles.label, dynamicStyles.label]}>
              Full name
            </Text>

            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
              maxLength={50}
            />
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, dynamicStyles.label]}>
              Username
            </Text>

            <View style={[styles.usernameInput, dynamicStyles.usernameInput]}>
              <Text style={[styles.atSymbol, dynamicStyles.atSymbol]}>
                @
              </Text>

              <TextInput
                style={[
                  styles.usernameTextInput,
                  dynamicStyles.usernameTextInput,
                ]}
                placeholder="username"
                placeholderTextColor={colors.textSecondary}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                maxLength={20}
              />
            </View>

            <Text style={[styles.helperText, dynamicStyles.helperText]}>
              3–20 characters. Letters, numbers and underscores only.
            </Text>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, dynamicStyles.label]}>
              Bio
            </Text>

            <TextInput
              style={[styles.input, styles.bioInput, dynamicStyles.input]}
              placeholder="Tell people a little about yourself..."
              placeholderTextColor={colors.textSecondary}
              value={bio}
              onChangeText={setBio}
              multiline
              textAlignVertical="top"
              maxLength={200}
            />

            <Text
              style={[styles.characterCount, dynamicStyles.characterCount]}
            >
              {bio.length}/200
            </Text>
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
              Skills
            </Text>

            <Text
              style={[styles.sectionSubtitle, dynamicStyles.sectionSubtitle]}
            >
              Add skills you can contribute to the community.
            </Text>

            {renderChips(skills, removeSkill)}

            <View style={styles.addInputRow}>
              <TextInput
                style={[styles.addInput, dynamicStyles.addInput]}
                placeholder="Add a skill..."
                placeholderTextColor={colors.textSecondary}
                value={newSkill}
                onChangeText={setNewSkill}
                onSubmitEditing={addSkill}
                returnKeyType="done"
              />

              <Pressable
                style={[
                  styles.addButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={addSkill}
              >
                <Ionicons name="add" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
              Interests
            </Text>

            <Text
              style={[styles.sectionSubtitle, dynamicStyles.sectionSubtitle]}
            >
              Add topics and activities you enjoy.
            </Text>

            {renderChips(interests, removeInterest)}

            <View style={styles.addInputRow}>
              <TextInput
                style={[styles.addInput, dynamicStyles.addInput]}
                placeholder="Add an interest..."
                placeholderTextColor={colors.textSecondary}
                value={newInterest}
                onChangeText={setNewInterest}
                onSubmitEditing={addInterest}
                returnKeyType="done"
              />

              <Pressable
                style={[
                  styles.addButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={addInterest}
              >
                <Ionicons name="add" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {/* Save */}
          <Pressable
            style={[
              styles.saveButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>

          <Text style={[styles.footer, dynamicStyles.footer]}>
            CONNECT · COLLABORATE · GROW
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  heading: {
    fontSize: 27,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 12,
    marginTop: 5,
  },

  cancelButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 9,
  },

  cancelText: {
    fontSize: 12,
    fontWeight: "700",
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "800",
  },

  avatarNote: {
    fontSize: 11,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 15,
  },

  sectionSubtitle: {
    fontSize: 11,
    marginTop: -8,
    marginBottom: 14,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 9,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 13,
  },

  usernameInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
  },

  atSymbol: {
    fontSize: 15,
    fontWeight: "700",
  },

  usernameTextInput: {
    flex: 1,
    paddingVertical: 13,
    paddingLeft: 5,
    fontSize: 13,
    borderWidth: 0,
    backgroundColor: "transparent",
  },

  helperText: {
    fontSize: 10,
    marginTop: 6,
  },

  bioInput: {
    minHeight: 105,
    lineHeight: 20,
  },

  characterCount: {
    fontSize: 10,
    textAlign: "right",
    marginTop: 5,
  },

  section: {
    marginTop: 10,
    marginBottom: 25,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 15,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 9,
  },

  chipText: {
    fontSize: 11,
    fontWeight: "600",
  },

  addInputRow: {
    flexDirection: "row",
    gap: 9,
  },

  addInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 11,
    fontSize: 12,
  },

  addButton: {
    width: 45,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButton: {
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 5,
  },

  saveButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  footer: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 25,
  },
});
