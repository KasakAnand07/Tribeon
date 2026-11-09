
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import { useCommunities } from "../context/CommunityContext";
import { ExploreStackParamList } from "../navigation/ExploreStackNavigator";

type Props = NativeStackScreenProps<
  ExploreStackParamList,
  "CommunityDetails"
>;

export default function CommunityDetailsScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const { isJoined, toggleJoin } = useCommunities();

  const { name, description, members, category, icon } = route.params;

  const joined = isJoined(name);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    surface: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    primaryText: {
      color: colors.textPrimary,
    },
    secondaryText: {
      color: colors.textSecondary,
    },
    iconContainer: {
      backgroundColor: colors.surfaceSecondary,
    },
    categoryBadge: {
      backgroundColor: colors.surfaceSecondary,
    },
    categoryText: {
      color: colors.primary,
    },
    joinButton: {
      backgroundColor: joined
        ? colors.surfaceSecondary
        : colors.primary,
    },
    joinText: {
      color: joined ? colors.primary : colors.white,
    },
    backButton: {
      backgroundColor: colors.surface,
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.backButton, dynamicStyles.backButton]}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={colors.textPrimary}
          />
        </Pressable>

        {/* Community Information */}
        <View style={styles.hero}>
          <View style={[styles.communityIcon, dynamicStyles.iconContainer]}>
            <Text style={styles.communityEmoji}>{icon}</Text>
          </View>

          <Text style={[styles.communityName, dynamicStyles.primaryText]}>
            {name}
          </Text>

          <View style={[styles.categoryBadge, dynamicStyles.categoryBadge]}>
            <Text style={[styles.categoryText, dynamicStyles.categoryText]}>
              {category}
            </Text>
          </View>

          <Text style={[styles.members, dynamicStyles.secondaryText]}>
            {members}
          </Text>
        </View>

        {/* Join / Leave */}
        <Pressable
          onPress={() => toggleJoin(name)}
          style={[styles.joinButton, dynamicStyles.joinButton]}
        >
          <Text style={[styles.joinText, dynamicStyles.joinText]}>
            {joined ? "Leave community" : "Join community"}
          </Text>
        </Pressable>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
            About this community
          </Text>

          <View style={[styles.descriptionCard, dynamicStyles.surface]}>
            <Text style={[styles.description, dynamicStyles.secondaryText]}>
              {description}
            </Text>
          </View>
        </View>

        {/* Community Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
            Community activity
          </Text>

          <View style={[styles.activityCard, dynamicStyles.surface]}>
            <View style={styles.activityItem}>
              <Ionicons
                name="people-outline"
                size={22}
                color={colors.primary}
              />
              <View>
                <Text style={[styles.activityTitle, dynamicStyles.primaryText]}>
                  Members
                </Text>
                <Text style={[styles.activitySubtitle, dynamicStyles.secondaryText]}>
                  Connect with like-minded people.
                </Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <Ionicons
                name="chatbubbles-outline"
                size={22}
                color={colors.primary}
              />
              <View>
                <Text style={[styles.activityTitle, dynamicStyles.primaryText]}>
                  Discussions
                </Text>
                <Text style={[styles.activitySubtitle, dynamicStyles.secondaryText]}>
                  Share ideas and learn together.
                </Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <Ionicons
                name="rocket-outline"
                size={22}
                color={colors.primary}
              />
              <View>
                <Text style={[styles.activityTitle, dynamicStyles.primaryText]}>
                  Collaborations
                </Text>
                <Text style={[styles.activitySubtitle, dynamicStyles.secondaryText]}>
                  Find people to build projects with.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.footer, dynamicStyles.secondaryText]}>
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
    paddingBottom: 35,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  hero: {
    alignItems: "center",
    marginBottom: 25,
  },
  communityIcon: {
    width: 85,
    height: 85,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },
  communityEmoji: {
    fontSize: 43,
  },
  communityName: {
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
  },
  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
  },
  members: {
    fontSize: 12,
    marginTop: 10,
  },
  joinButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 28,
  },
  joinText: {
    fontSize: 14,
    fontWeight: "700",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 13,
  },
  descriptionCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  description: {
    fontSize: 13,
    lineHeight: 21,
  },
  activityCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 20,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  activitySubtitle: {
    fontSize: 11,
    marginTop: 4,
  },
  footer: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 15,
  },
});
