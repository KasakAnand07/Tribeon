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
import { useTheme } from "../context/ThemeContext";
import { usePosts } from "../context/PostContext";

const intentions = ["Looking for", "Offering", "Collaborating", "Discussing"];

const categories = [
  "Technology",
  "Design",
  "Education",
  "Business",
  "Gaming",
  "Other",
];

export default function CreatePostScreen() {
  const { colors } = useTheme();
  const { addPost } = usePosts();
  const [intention, setIntention] = useState("Looking for");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology");

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
    sectionTitle: {
      color: colors.textPrimary,
    },
    intentionChip: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    intentionText: {
      color: colors.textSecondary,
    },
    selectedIntention: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    label: {
      color: colors.textPrimary,
    },
    input: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.textPrimary,
    },
    characterCount: {
      color: colors.textSecondary,
    },
    categoryChip: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    categoryText: {
      color: colors.textSecondary,
    },
    selectedCategory: {
      backgroundColor: colors.surfaceSecondary,
      borderColor: colors.primary,
    },
    selectedCategoryText: {
      color: colors.primary,
    },
    infoBox: {
      backgroundColor: colors.surfaceSecondary,
    },
    infoTitle: {
      color: colors.primary,
    },
    infoText: {
      color: colors.textSecondary,
    },
    footer: {
      color: colors.textSecondary,
    },
  });

  const handlePublish = () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter a post title.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Missing description", "Please describe your post.");
      return;
    }

    if (description.trim().length < 10) {
      Alert.alert(
        "Description too short",
        "Please write at least 10 characters.",
      );
      return;
    }

    addPost({
      intention,
      title: title.trim(),
      description: description.trim(),
      category,
    });

    setTitle("");
    setDescription("");
    setIntention("Looking for");
    setCategory("Technology");

    Alert.alert(
      "Published!",
      "Your post has been added to the community feed.",
    );
  };

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
                Create a post
              </Text>

              <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                Share an idea, ask for help or find collaborators.
              </Text>
            </View>
          </View>

          {/* Intention */}
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            What's your intention?
          </Text>

          <View style={styles.intentionContainer}>
            {intentions.map((item) => {
              const selected = intention === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setIntention(item)}
                  style={[
                    styles.intentionChip,
                    dynamicStyles.intentionChip,
                    selected && dynamicStyles.selectedIntention,
                  ]}
                >
                  <Text
                    style={[
                      styles.intentionText,
                      dynamicStyles.intentionText,
                      selected && styles.selectedIntentionText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Title */}
          <View style={styles.field}>
            <Text style={[styles.label, dynamicStyles.label]}>Post title</Text>

            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder="Give your post a clear title"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <Text style={[styles.characterCount, dynamicStyles.characterCount]}>
              {title.length}/100
            </Text>
          </View>

          {/* Description */}
          <View style={styles.field}>
            <Text style={[styles.label, dynamicStyles.label]}>Description</Text>

            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
                dynamicStyles.input,
              ]}
              placeholder="Tell the community what you're looking for or offering..."
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              maxLength={1000}
            />

            <Text style={[styles.characterCount, dynamicStyles.characterCount]}>
              {description.length}/1000
            </Text>
          </View>

          {/* Category */}
          <View style={styles.field}>
            <Text style={[styles.label, dynamicStyles.label]}>
              Choose a category
            </Text>

            <View style={styles.categoryContainer}>
              {categories.map((item) => {
                const selected = category === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setCategory(item)}
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
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Information */}
          <View style={[styles.infoBox, dynamicStyles.infoBox]}>
            <Text style={[styles.infoTitle, dynamicStyles.infoTitle]}>
              Before you publish
            </Text>

            <Text style={[styles.infoText, dynamicStyles.infoText]}>
              Be clear about your expectations. Helpful details make it easier
              for the right people to respond.
            </Text>
          </View>

          {/* Publish */}
          <Pressable style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publish post →</Text>
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
    marginBottom: 30,
  },

  heading: {
    fontSize: 27,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 12,
    marginTop: 6,
    lineHeight: 19,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 13,
  },

  intentionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 28,
  },

  intentionChip: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },

  intentionText: {
    fontSize: 12,
    fontWeight: "600",
  },

  selectedIntentionText: {
    color: "#FFFFFF",
  },

  field: {
    marginBottom: 23,
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

  descriptionInput: {
    minHeight: 145,
    lineHeight: 21,
  },

  characterCount: {
    fontSize: 10,
    textAlign: "right",
    marginTop: 6,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  categoryChip: {
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: "600",
  },

  infoBox: {
    borderRadius: 13,
    padding: 15,
    marginBottom: 25,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },

  infoText: {
    fontSize: 11,
    lineHeight: 18,
  },

  publishButton: {
    backgroundColor: "#635BDB",
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: "center",
  },

  publishButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  footer: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 30,
  },
});
