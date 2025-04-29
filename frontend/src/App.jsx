import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import LoginScreen from "./app/Login.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AlertProvider>
          <NavigationContainer>
            <LoginScreen />
          </NavigationContainer>
        </AlertProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
