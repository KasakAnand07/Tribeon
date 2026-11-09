
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExploreScreen from "../screens/ExploreScreen";
import CommunityDetailsScreen from "../screens/CommunityDetailsScreen";

export type ExploreStackParamList = {
  ExploreMain: undefined;
  CommunityDetails: {
    name: string;
    description: string;
    members: string;
    category: string;
    icon: string;
  };
};

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreMain" component={ExploreScreen} />
      <Stack.Screen
        name="CommunityDetails"
        component={CommunityDetailsScreen}
      />
    </Stack.Navigator>
  );
}
