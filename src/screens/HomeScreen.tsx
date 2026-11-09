import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { usePosts } from "../context/PostContext";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const { posts, isLoading } = usePosts();
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
    searchIcon: {
      color: colors.textSecondary,
    },
    searchInput: {
      color: colors.textPrimary,
    },
    notificationButton: {
      backgroundColor: colors.surfaceSecondary,
    },
    notificationIcon: {
      color: colors.primary,
    },
    avatar: {
      backgroundColor: colors.surfaceSecondary,
    },
    avatarSecond: {
      backgroundColor: colors.surfaceSecondary,
    },
    avatarText: {
      color: colors.primary,
    },
    postBadge: {
      backgroundColor: colors.surfaceSecondary,
    },
    badgeText: {
      color: colors.primary,
    },
    tag: {
      color: colors.primary,
      backgroundColor: colors.surfaceSecondary,
    },
    postFooter: {
      borderTopColor: colors.border,
    },
    respondButton: {
      color: colors.primary,
    },
    seeAll: {
      color: colors.primary,
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.brandContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>T</Text>
              </View>
              <Text style={[styles.brand, dynamicStyles.primaryText]}>
                Tribeon
              </Text>
            </View>

            <Pressable
              style={[
                styles.notificationButton,
                dynamicStyles.notificationButton,
              ]}
            >
              <Text
                style={[
                  styles.notificationIcon,
                  dynamicStyles.notificationIcon,
                ]}
              >
                ♧
              </Text>
            </Pressable>
          </View>

          {/* Search */}
          <View style={[styles.searchContainer, dynamicStyles.surface]}>
            <Text style={[styles.searchIcon, dynamicStyles.searchIcon]}>⌕</Text>

            <TextInput
              style={[styles.searchInput, dynamicStyles.searchInput]}
              placeholder="Search people, skills, communities..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Welcome */}
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeTitle, dynamicStyles.primaryText]}>
              Find your people.{"\n"}Build together.
            </Text>

            <Text style={[styles.welcomeSubtitle, dynamicStyles.secondaryText]}>
              What are you looking to do today?
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionGrid}>
            <Pressable style={[styles.actionCard, dynamicStyles.surface]}>
              <Text style={styles.actionIcon}>👥</Text>

              <Text style={[styles.actionTitle, dynamicStyles.primaryText]}>
                Find collaborators
              </Text>

              <Text
                style={[styles.actionSubtitle, dynamicStyles.secondaryText]}
              >
                Build something together
              </Text>
            </Pressable>

            <Pressable style={[styles.actionCard, dynamicStyles.surface]}>
              <Text style={styles.actionIcon}>📚</Text>

              <Text style={[styles.actionTitle, dynamicStyles.primaryText]}>
                Find study partners
              </Text>

              <Text
                style={[styles.actionSubtitle, dynamicStyles.secondaryText]}
              >
                Learn with others
              </Text>
            </Pressable>
          </View>

          {/* Feed Heading */}
          <View style={styles.feedHeader}>
            <Text style={[styles.feedTitle, dynamicStyles.primaryText]}>
              Community feed
            </Text>

            <Pressable>
              <Text style={[styles.seeAll, dynamicStyles.seeAll]}>See all</Text>
            </Pressable>
          </View>

          {/* Newly Created Posts */}
          {!isLoading &&
            posts.map((post) => (
              <View
                key={post.id}
                style={[styles.postCard, dynamicStyles.surface]}
              >
                <View style={styles.postHeader}>
                  <View style={[styles.avatar, dynamicStyles.avatar]}>
                    <Text style={[styles.avatarText, dynamicStyles.avatarText]}>
                      Y
                    </Text>
                  </View>

                  <View style={styles.userInfo}>
                    <Text style={[styles.userName, dynamicStyles.primaryText]}>
                      {post.author}
                    </Text>

                    <Text
                      style={[styles.postTime, dynamicStyles.secondaryText]}
                    >
                      {new Date(post.createdAt).toLocaleString()}
                    </Text>
                  </View>

                  <View style={[styles.postBadge, dynamicStyles.postBadge]}>
                    <Text style={[styles.badgeText, dynamicStyles.badgeText]}>
                      {post.intention}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.userName,
                    dynamicStyles.primaryText,
                    { marginTop: 15 },
                  ]}
                >
                  {post.title}
                </Text>

                <Text
                  style={[styles.postDescription, dynamicStyles.primaryText]}
                >
                  {post.description}
                </Text>

                <View style={styles.tagsContainer}>
                  <Text style={[styles.tag, dynamicStyles.tag]}>
                    {post.category}
                  </Text>
                </View>

                <View style={[styles.postFooter, dynamicStyles.postFooter]}>
                  <Text style={[styles.postMeta, dynamicStyles.secondaryText]}>
                    {post.likes} likes
                  </Text>

                  <Pressable>
                    <Text
                      style={[
                        styles.respondButton,
                        dynamicStyles.respondButton,
                      ]}
                    >
                      Respond →
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}

          {/* Sample Post 1 */}
          <View style={[styles.postCard, dynamicStyles.surface]}>
            <View style={styles.postHeader}>
              <View style={[styles.avatar, dynamicStyles.avatar]}>
                <Text style={[styles.avatarText, dynamicStyles.avatarText]}>
                  A
                </Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={[styles.userName, dynamicStyles.primaryText]}>
                  Aarav Sharma
                </Text>

                <Text style={[styles.postTime, dynamicStyles.secondaryText]}>
                  2 hours ago
                </Text>
              </View>

              <View style={[styles.postBadge, dynamicStyles.postBadge]}>
                <Text style={[styles.badgeText, dynamicStyles.badgeText]}>
                  Looking for
                </Text>
              </View>
            </View>

            <Text style={[styles.postDescription, dynamicStyles.primaryText]}>
              Need two developers to build a React Native project. Anyone
              interested in collaborating?
            </Text>

            <View style={styles.tagsContainer}>
              <Text style={[styles.tag, dynamicStyles.tag]}>React Native</Text>

              <Text style={[styles.tag, dynamicStyles.tag]}>Collaboration</Text>
            </View>

            <View style={[styles.postFooter, dynamicStyles.postFooter]}>
              <Text style={[styles.postMeta, dynamicStyles.secondaryText]}>
                3 responses
              </Text>

              <Pressable>
                <Text
                  style={[styles.respondButton, dynamicStyles.respondButton]}
                >
                  Respond →
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Sample Post 2 */}
          <View style={[styles.postCard, dynamicStyles.surface]}>
            <View style={styles.postHeader}>
              <View
                style={[
                  styles.avatar,
                  dynamicStyles.avatar,
                  dynamicStyles.avatarSecond,
                ]}
              >
                <Text style={[styles.avatarText, dynamicStyles.avatarText]}>
                  P
                </Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={[styles.userName, dynamicStyles.primaryText]}>
                  Priya Nair
                </Text>

                <Text style={[styles.postTime, dynamicStyles.secondaryText]}>
                  5 hours ago
                </Text>
              </View>

              <View style={[styles.postBadge, dynamicStyles.postBadge]}>
                <Text style={[styles.badgeText, dynamicStyles.badgeText]}>
                  Offering
                </Text>
              </View>
            </View>

            <Text style={[styles.postDescription, dynamicStyles.primaryText]}>
              I can help beginners understand Java fundamentals and OOP
              concepts. Looking to connect with learners!
            </Text>

            <View style={styles.tagsContainer}>
              <Text style={[styles.tag, dynamicStyles.tag]}>Java</Text>

              <Text style={[styles.tag, dynamicStyles.tag]}>Mentoring</Text>
            </View>

            <View style={[styles.postFooter, dynamicStyles.postFooter]}>
              <Text style={[styles.postMeta, dynamicStyles.secondaryText]}>
                5 responses
              </Text>

              <Pressable>
                <Text
                  style={[styles.respondButton, dynamicStyles.respondButton]}
                >
                  Respond →
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  brand: {
    fontSize: 22,
    fontWeight: "800",
  },

  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    fontSize: 23,
  },

  searchContainer: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 28,
  },

  searchIcon: {
    fontSize: 25,
    marginRight: 9,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
  },

  welcomeSection: {
    marginBottom: 22,
  },

  welcomeTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "800",
    letterSpacing: -0.6,
  },

  welcomeSubtitle: {
    fontSize: 13,
    marginTop: 9,
  },

  actionGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },

  actionCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },

  actionIcon: {
    fontSize: 23,
    marginBottom: 13,
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: "700",
  },

  actionSubtitle: {
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
  },

  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  feedTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  seeAll: {
    fontSize: 12,
    fontWeight: "700",
  },

  postCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 15,
    marginBottom: 14,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarSecond: {},

  avatarText: {
    fontSize: 15,
    fontWeight: "800",
  },

  userInfo: {
    flex: 1,
    marginLeft: 10,
  },

  userName: {
    fontSize: 13,
    fontWeight: "700",
  },

  postTime: {
    fontSize: 10,
    marginTop: 3,
  },

  postBadge: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },

  postDescription: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 15,
  },

  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
  },

  tag: {
    fontSize: 10,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 7,
  },

  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 15,
    paddingTop: 12,
  },

  postMeta: {
    fontSize: 11,
  },

  respondButton: {
    fontSize: 12,
    fontWeight: "700",
  },
});
