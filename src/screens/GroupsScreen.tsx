
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useCommunities } from "../context/CommunityContext";

const groups = [
  {
    id: "1",
    name: "React Developers",
    description: "Learn, share and build projects with React developers.",
    members: "1.2k members",
    category: "Technology",
    icon: "⚛️",
  },
  {
    id: "2",
    name: "DSA Study Circle",
    description: "Practice coding problems and prepare together.",
    members: "850 members",
    category: "Education",
    icon: "💻",
  },
  {
    id: "3",
    name: "Design Thinkers",
    description: "Explore creativity, UI/UX and product design.",
    members: "620 members",
    category: "Design",
    icon: "🎨",
  },
  {
    id: "4",
    name: "Startup Builders",
    description: "Meet founders and turn ideas into real products.",
    members: "540 members",
    category: "Business",
    icon: "🚀",
  },
  {
    id: "5",
    name: "Java Community",
    description: "Discuss Java, Spring Boot and backend development.",
    members: "920 members",
    category: "Technology",
    icon: "☕",
  },
];

export default function GroupsScreen() {
  const { colors } = useTheme();
  const { isJoined, toggleJoin } = useCommunities();

  const [activeFilter, setActiveFilter] = useState("All");

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    primaryText: {
      color: colors.textPrimary,
    },
    secondaryText: {
      color: colors.textSecondary,
    },
    surface: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    introCard: {
      backgroundColor: colors.surfaceSecondary,
    },
    introTitle: {
      color: colors.primary,
    },
    introDescription: {
      color: colors.textSecondary,
    },
    filterButton: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    selectedFilter: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      color: colors.textSecondary,
    },
    groupIcon: {
      backgroundColor: colors.surfaceSecondary,
    },
    groupFooter: {
      borderTopColor: colors.border,
    },
    joinButton: {
      backgroundColor: colors.primary,
    },
    joinedButton: {
      backgroundColor: colors.surfaceSecondary,
    },
    joinButtonText: {
      color: colors.white,
    },
    joinedButtonText: {
      color: colors.primary,
    },
    emptyState: {
      backgroundColor: colors.surface,
    },
    footer: {
      color: colors.textSecondary,
    },
  });

  const filteredGroups = groups.filter((group) => {
    const joined = isJoined(group.name);

    if (activeFilter === "Joined") return joined;
    if (activeFilter === "Discover") return !joined;

    return true;
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.heading, dynamicStyles.primaryText]}>
              Communities
            </Text>

            <Text style={[styles.subtitle, dynamicStyles.secondaryText]}>
              Find your tribe. Learn and grow together.
            </Text>
          </View>

          <View style={styles.logo}>
            <Text style={styles.logoText}>T</Text>
          </View>
        </View>

        {/* Intro Card */}
        <View style={[styles.introCard, dynamicStyles.introCard]}>
          <Text style={[styles.introTitle, dynamicStyles.introTitle]}>
            Better together.
          </Text>

          <Text
            style={[
              styles.introDescription,
              dynamicStyles.introDescription,
            ]}
          >
            Join communities that match your interests,
            exchange knowledge and find people to build with.
          </Text>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {["All", "Joined", "Discover"].map((filter) => {
            const selected = activeFilter === filter;

            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterButton,
                  dynamicStyles.filterButton,
                  selected && dynamicStyles.selectedFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    dynamicStyles.filterText,
                    selected && styles.selectedFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Group List */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
            {activeFilter === "Joined"
              ? "Your communities"
              : activeFilter === "Discover"
              ? "Discover communities"
              : "Explore communities"}
          </Text>

          <Text style={[styles.groupCount, dynamicStyles.secondaryText]}>
            {filteredGroups.length} groups
          </Text>
        </View>

        {filteredGroups.length === 0 ? (
          <View style={[styles.emptyState, dynamicStyles.emptyState]}>
            <Text style={[styles.emptyTitle, dynamicStyles.primaryText]}>
              No communities yet
            </Text>

            <Text
              style={[
                styles.emptyDescription,
                dynamicStyles.secondaryText,
              ]}
            >
              Discover and join communities to see them here.
            </Text>
          </View>
        ) : (
          filteredGroups.map((group) => {
            const joined = isJoined(group.name);

            return (
              <View
                style={[styles.groupCard, dynamicStyles.surface]}
                key={group.id}
              >
                <View style={styles.groupHeader}>
                  <View style={[styles.groupIcon, dynamicStyles.groupIcon]}>
                    <Text style={styles.groupEmoji}>
                      {group.icon}
                    </Text>
                  </View>

                  <View style={styles.groupInfo}>
                    <Text
                      style={[styles.groupName, dynamicStyles.primaryText]}
                    >
                      {group.name}
                    </Text>

                    <Text
                      style={[
                        styles.groupCategory,
                        dynamicStyles.secondaryText,
                      ]}
                    >
                      {group.category}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.groupDescription,
                    dynamicStyles.secondaryText,
                  ]}
                >
                  {group.description}
                </Text>

                <View
                  style={[
                    styles.groupFooter,
                    dynamicStyles.groupFooter,
                  ]}
                >
                  <Text
                    style={[styles.memberCount, dynamicStyles.secondaryText]}
                  >
                    {group.members}
                  </Text>

                  <Pressable
                    onPress={() => toggleJoin(group.name)}
                    style={[
                      styles.joinButton,
                      dynamicStyles.joinButton,
                      joined && [
                        styles.joinedButton,
                        dynamicStyles.joinedButton,
                      ],
                    ]}
                  >
                    <Text
                      style={[
                        styles.joinButtonText,
                        dynamicStyles.joinButtonText,
                        joined && dynamicStyles.joinedButtonText,
                      ]}
                    >
                      {joined ? "Joined ✓" : "Join community"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })
        )}

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
    marginBottom: 23,
  },
  heading: {
    fontSize: 27,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 5,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#635BDB",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "800",
  },
  introCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 23,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  introDescription: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  filters: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 24,
  },
  filterButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 17,
    paddingVertical: 9,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
  },
  selectedFilterText: {
    color: "#FFFFFF",
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
  groupCount: {
    fontSize: 11,
  },
  groupCard: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 15,
    marginBottom: 13,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  groupEmoji: {
    fontSize: 23,
  },
  groupInfo: {
    marginLeft: 12,
  },
  groupName: {
    fontSize: 14,
    fontWeight: "700",
  },
  groupCategory: {
    fontSize: 11,
    marginTop: 4,
  },
  groupDescription: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: 14,
  },
  groupFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 12,
  },
  memberCount: {
    fontSize: 11,
  },
  joinButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 9,
  },
  joinedButton: {},
  joinButtonText: {
    fontSize: 11,
    fontWeight: "700",
  },
  emptyState: {
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  emptyDescription: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 7,
  },
  footer: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 25,
  },
});
