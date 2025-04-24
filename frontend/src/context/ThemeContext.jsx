import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import lightTheme from "../config/LightTheme.js";
import darkTheme from "../config/DarkTheme.js";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "dark") {
        setTheme(darkTheme);
        setMode("dark");
      } else {
        setTheme(lightTheme);
        setMode("light");
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (newMode) => {
    if (newMode === "dark") {
      setTheme(darkTheme);
      setMode("dark");
      await AsyncStorage.setItem("theme", "dark");
    } else {
      setTheme(lightTheme);
      setMode("light");
      await AsyncStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      {children}
    </ThemeContext.Provider>
  );
}
