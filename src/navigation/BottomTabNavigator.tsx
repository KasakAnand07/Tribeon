import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ExploreStackNavigator from "./ExploreStackNavigator";
import CreatePostScreen from "../screens/CreatePostScreen";
import GroupsScreen from "../screens/GroupsScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { useTheme } from "../context/ThemeContext";

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Create: undefined;
  Groups: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function BottomTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Home: focused ? "home" : "home-outline",
            Explore: focused ? "compass" : "compass-outline",
            Create: focused ? "add-circle" : "add-circle-outline",
            Groups: focused ? "people" : "people-outline",
            Profile: focused ? "person" : "person-outline",
          } as const;

          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreStackNavigator} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
