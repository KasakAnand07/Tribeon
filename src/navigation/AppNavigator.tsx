import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
