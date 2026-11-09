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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ExploreStackParamList } from "../navigation/ExploreStackNavigator";

const categories = [
  "All",
  "Technology",
  "Design",
  "Business",
  "Education",
  "Gaming",
];

const people = [
  {
    name: "Ananya Rao",
    role: "UI/UX Designer",
    skills: "Figma · UI Design · Prototyping",
    initial: "A",
    category: "Design",
  },
  {
    name: "Rahul Mehta",
    role: "Full Stack Developer",
    skills: "React · Node.js · MongoDB",
    initial: "R",
    category: "Technology",
  },
  {
    name: "Sneha Kapoor",
    role: "Computer Science Student",
    skills: "Java · DSA · Problem Solving",
    initial: "S",
    category: "Education",
  },
];

const communities = [
  {
    name: "React Developers",
    description: "Learn, share and build with React developers.",
    members: "1.2k members",
    icon: "⚛️",
    category: "Technology",
  },
  {
    name: "DSA Study Circle",
    description: "Practice problems and prepare together.",
    members: "850 members",
    icon: "💻",
    category: "Education",
  },
  {
    name: "Design Thinkers",
    description: "Discuss design, creativity and user experience.",
    members: "620 members",
    icon: "🎨",
    category: "Design",
  },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [requestedPeople, setRequestedPeople] = useState<string[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<ExploreStackParamList>>();
  const { colors } = useTheme();

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
    searchInput: {
      color: colors.textPrimary,
    },
    categoryChip: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    categoryText: {
      color: colors.textSecondary,
    },
    selectedCategory: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    selectedCategoryText: {
      color: colors.white,
    },
    avatar: {
      backgroundColor: colors.surfaceSecondary,
    },
    avatarText: {
      color: colors.primary,
    },
    connectButton: {
      backgroundColor: colors.surfaceSecondary,
    },
    connectText: {
      color: colors.primary,
    },
    requestedButton: {
      backgroundColor: colors.primary,
    },
    requestedText: {
      color: colors.white,
    },
    communityIcon: {
      backgroundColor: colors.surfaceSecondary,
    },
    seeAll: {
      color: colors.primary,
    },
    joinText: {
      color: colors.primary,
    },
    footer: {
      color: colors.textSecondary,
    },
  });

  // Toggle connection request
  const toggleConnection = (personName: string) => {
    setRequestedPeople((previousRequests) =>
      previousRequests.includes(personName)
        ? previousRequests.filter((name) => name !== personName)
        : [...previousRequests, personName],
    );
  };

  // Filter people using search and category
  const filteredPeople = people.filter((person) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      person.name.toLowerCase().includes(query) ||
      person.role.toLowerCase().includes(query) ||
      person.skills.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "All" || person.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Filter communities using search and category
  const filteredCommunities = communities.filter((community) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      community.name.toLowerCase().includes(query) ||
      community.description.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "All" || community.category === activeCategory;

    return matchesSearch && matchesCategory;
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
              Explore
            </Text>

            <Text style={[styles.subtitle, dynamicStyles.secondaryText]}>
              Discover people, skills and communities.
            </Text>
          </View>

          <View style={styles.logo}>
            <Text style={styles.logoText}>T</Text>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchContainer, dynamicStyles.surface]}>
          <Text style={[styles.searchIcon, dynamicStyles.secondaryText]}>
            ⌕
          </Text>

          <TextInput
            style={[styles.searchInput, dynamicStyles.searchInput]}
            placeholder="Search people, skills, communities..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
          Browse interests
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const selected = activeCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryChip,
                  dynamicStyles.categoryChip,
                  selected && dynamicStyles.selectedCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    dynamicStyles.categoryText,
                    selected && dynamicStyles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* People */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
            People you may connect with
          </Text>

          <Text style={[styles.seeAll, dynamicStyles.seeAll]}>
            {filteredPeople.length} people
          </Text>
        </View>

        {filteredPeople.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, dynamicStyles.primaryText]}>
              No people found
            </Text>

            <Text
              style={[styles.emptyDescription, dynamicStyles.secondaryText]}
            >
              Try another search or category.
            </Text>
          </View>
        ) : (
          filteredPeople.map((person) => {
            const isRequested = requestedPeople.includes(person.name);

            return (
              <View
                style={[styles.personCard, dynamicStyles.surface]}
                key={person.name}
              >
                <View style={[styles.avatar, dynamicStyles.avatar]}>
                  <Text style={[styles.avatarText, dynamicStyles.avatarText]}>
                    {person.initial}
                  </Text>
                </View>

                <View style={styles.personInfo}>
                  <Text style={[styles.personName, dynamicStyles.primaryText]}>
                    {person.name}
                  </Text>

                  <Text
                    style={[styles.personRole, dynamicStyles.secondaryText]}
                  >
                    {person.role}
                  </Text>

                  <Text
                    style={[styles.personSkills, dynamicStyles.secondaryText]}
                  >
                    {person.skills}
                  </Text>
                </View>

                <Pressable
                  onPress={() => toggleConnection(person.name)}
                  style={[
                    styles.connectButton,
                    dynamicStyles.connectButton,
                    isRequested && dynamicStyles.requestedButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.connectText,
                      dynamicStyles.connectText,
                      isRequested && dynamicStyles.requestedText,
                    ]}
                  >
                    {isRequested ? "Requested" : "Connect"}
                  </Text>
                </Pressable>
              </View>
            );
          })
        )}

        {/* Communities */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.primaryText]}>
            Popular communities
          </Text>

          <Text style={[styles.seeAll, dynamicStyles.seeAll]}>
            {filteredCommunities.length} communities
          </Text>
        </View>

        {filteredCommunities.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, dynamicStyles.primaryText]}>
              No communities found
            </Text>

            <Text
              style={[styles.emptyDescription, dynamicStyles.secondaryText]}
            >
              Try another search or category.
            </Text>
          </View>
        ) : (
          filteredCommunities.map((community) => (
            <View
              style={[styles.communityCard, dynamicStyles.surface]}
              key={community.name}
            >
              <View style={styles.communityTop}>
                <View
                  style={[styles.communityIcon, dynamicStyles.communityIcon]}
                >
                  <Text style={styles.communityEmoji}>{community.icon}</Text>
                </View>

                <View style={styles.communityInfo}>
                  <Text
                    style={[styles.communityName, dynamicStyles.primaryText]}
                  >
                    {community.name}
                  </Text>

                  <Text
                    style={[
                      styles.communityMembers,
                      dynamicStyles.secondaryText,
                    ]}
                  >
                    {community.members}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.communityDescription,
                  dynamicStyles.secondaryText,
                ]}
              >
                {community.description}
              </Text>

              <Pressable
                style={styles.joinButton}
                onPress={() =>
                  navigation.navigate("CommunityDetails", {
                    name: community.name,
                    description: community.description,
                    members: community.members,
                    category: community.category,
                    icon: community.icon,
                  })
                }
              >
                <Text style={[styles.joinText, dynamicStyles.joinText]}>
                  View community →
                </Text>
              </Pressable>
            </View>
          ))
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
    paddingTop: 8,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
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
    fontSize: 24,
    marginRight: 9,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
  },
  categoryList: {
    gap: 9,
    paddingVertical: 15,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 14,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: "700",
  },
  personCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    padding: 13,
    marginBottom: 11,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 17,
    fontWeight: "800",
  },
  personInfo: {
    flex: 1,
    marginLeft: 11,
  },
  personName: {
    fontSize: 13,
    fontWeight: "700",
  },
  personRole: {
    fontSize: 11,
    marginTop: 3,
  },
  personSkills: {
    fontSize: 10,
    marginTop: 4,
  },
  connectButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 9,
  },
  connectText: {
    fontSize: 10,
    fontWeight: "700",
  },
  communityCard: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 15,
    marginBottom: 12,
  },
  communityTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  communityIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  communityEmoji: {
    fontSize: 22,
  },
  communityInfo: {
    marginLeft: 11,
  },
  communityName: {
    fontSize: 13,
    fontWeight: "700",
  },
  communityMembers: {
    fontSize: 11,
    marginTop: 4,
  },
  communityDescription: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: 13,
  },
  joinButton: {
    alignSelf: "flex-start",
    marginTop: 12,
  },
  joinText: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  emptyDescription: {
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
  footer: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 25,
  },
});
