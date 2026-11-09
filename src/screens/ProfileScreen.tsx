
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";
import { useProfile } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

type Props = NativeStackScreenProps<ProfileStackParamList, "ProfileMain">;

export default function ProfileScreen({ navigation }: Props) {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { profile } = useProfile();
  const { skills, interests } = profile;

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    heading: {
      color: colors.textPrimary,
    },
    primaryText: {
      color: colors.textPrimary,
    },
    secondaryText: {
      color: colors.textSecondary,
    },
    settingsButton: {
      backgroundColor: colors.surfaceSecondary,
    },
    skillChip: {
      backgroundColor: colors.surfaceSecondary,
    },
    skillText: {
      color: colors.primary,
    },
    interestText: {
      color: colors.textSecondary,
    },
    divider: {
      backgroundColor: colors.border,
    },
    optionRow: {
      borderBottomColor: colors.border,
    },
    footer: {
      color: colors.textSecondary,
    },
  });

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Authentication and logout functionality will be connected to the backend later."
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, dynamicStyles.container]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.heading, dynamicStyles.heading]}>
            My Profile
          </Text>

          <Pressable
            style={[styles.settingsButton, dynamicStyles.settingsButton]}
            onPress={() =>
              Alert.alert("Settings", "Settings will be implemented later.")
            }
          >
            <Ionicons
              name="settings-outline"
              size={21}
              color={colors.primary}
            />
          </Pressable>
        </View>

        {/* Profile Information */}
        <View style={[styles.profileCard, dynamicStyles.card]}>
          <View style={styles.cover}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile.name.trim().charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <Text style={[styles.name, dynamicStyles.primaryText]}>
              {profile.name}
            </Text>

            <Text style={[styles.username, dynamicStyles.secondaryText]}>
              @{profile.username}
            </Text>

            <Text style={[styles.bio, dynamicStyles.secondaryText]}>
              {profile.bio}
            </Text>

            <Pressable
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Ionicons name="create-outline" size={16} color="#FFFFFF" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>
          </View>
        </View>

        {/* Statistics */}
        <View style={[styles.statsCard, dynamicStyles.card]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, dynamicStyles.primaryText]}>
              0
            </Text>
            <Text style={[styles.statLabel, dynamicStyles.secondaryText]}>
              Posts
            </Text>
          </View>

          <View style={[styles.statDivider, dynamicStyles.divider]} />

          <View style={styles.statItem}>
            <Text style={[styles.statNumber, dynamicStyles.primaryText]}>
              0
            </Text>
            <Text style={[styles.statLabel, dynamicStyles.secondaryText]}>
              Connections
            </Text>
          </View>

          <View style={[styles.statDivider, dynamicStyles.divider]} />

          <View style={styles.statItem}>
            <Text style={[styles.statNumber, dynamicStyles.primaryText]}>
              2
            </Text>
            <Text style={[styles.statLabel, dynamicStyles.secondaryText]}>
              Communities
            </Text>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
                Skills
              </Text>
              <Text style={[styles.sectionSubtitle, dynamicStyles.secondaryText]}>
                What you can contribute
              </Text>
            </View>

            <Pressable onPress={handleEditProfile}>
              <Ionicons name="add-circle-outline" size={23} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.chipContainer}>
            {skills.map((skill) => (
              <View
                style={[styles.skillChip, dynamicStyles.skillChip]}
                key={skill}
              >
                <Text style={[styles.skillText, dynamicStyles.skillText]}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
                Interests
              </Text>
              <Text style={[styles.sectionSubtitle, dynamicStyles.secondaryText]}>
                What you enjoy exploring
              </Text>
            </View>

            <Pressable onPress={handleEditProfile}>
              <Ionicons name="add-circle-outline" size={23} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.chipContainer}>
            {interests.map((interest) => (
              <View
                style={[styles.interestChip, dynamicStyles.card]}
                key={interest}
              >
                <Text style={[styles.interestText, dynamicStyles.interestText]}>
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Theme Toggle */}
        <View style={[styles.optionRow, dynamicStyles.optionRow]}>
          <Ionicons
            name={isDarkMode ? "moon-outline" : "sunny-outline"}
            size={20}
            color={colors.textSecondary}
          />

          <Text style={[styles.optionText, dynamicStyles.primaryText]}>
            Dark Mode
          </Text>

          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{
              false: "#D1D5DB",
              true: colors.primary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Account Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
            Account
          </Text>

          <Pressable
            style={[styles.optionRow, dynamicStyles.optionRow]}
            onPress={() => Alert.alert("Settings", "Settings coming soon.")}
          >
            <Ionicons name="settings-outline" size={20} color={colors.textSecondary} />
            <Text style={[styles.optionText, dynamicStyles.primaryText]}>
              Settings
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>

          <Pressable
            style={[styles.optionRow, dynamicStyles.optionRow]}
            onPress={() => Alert.alert("Privacy", "Privacy settings coming soon.")}
          >
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.textSecondary} />
            <Text style={[styles.optionText, dynamicStyles.primaryText]}>
              Privacy
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>

          <Pressable
            style={[styles.optionRow, dynamicStyles.optionRow]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={styles.logoutText}>Log out</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>
        </View>

        <Text style={[styles.footer, dynamicStyles.footer]}>
          CONNECT · COLLABORATE · GROW
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 20,
  },

  heading: {
    fontSize: 27,
    fontWeight: "800",
  },

  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  profileCard: {
    borderRadius: 17,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 15,
  },

  cover: {
    height: 90,
    backgroundColor: "#635BDB",
    justifyContent: "flex-end",
    paddingLeft: 18,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -36,
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#635BDB",
  },

  profileDetails: {
    padding: 18,
    paddingTop: 44,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
  },

  username: {
    fontSize: 12,
    marginTop: 4,
  },

  bio: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: 13,
  },

  editButton: {
    backgroundColor: "#635BDB",
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 17,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  statsCard: {
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 25,
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    fontSize: 19,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 11,
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 32,
  },

  section: {
    marginBottom: 27,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  sectionSubtitle: {
    fontSize: 11,
    marginTop: 4,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  skillChip: {
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  skillText: {
    fontSize: 11,
    fontWeight: "600",
  },

  interestChip: {
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  interestText: {
    fontSize: 11,
    fontWeight: "600",
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 13,
  },

  optionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },

  logoutText: {
    flex: 1,
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "600",
  },

  footer: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 10,
  },
});
