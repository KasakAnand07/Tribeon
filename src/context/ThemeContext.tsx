import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { lightColors, darkColors, ThemeColors } from "../theme/colors";

type ThemeContextType = {
  isDarkMode: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("tribeon-theme");
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === "dark");
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);

    try {
      await AsyncStorage.setItem(
        "tribeon-theme",
        newValue ? "dark" : "light"
      );
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, colors, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}