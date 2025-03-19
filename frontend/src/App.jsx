import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import TabNavigator from "./components/tab-navigator.jsx";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync(); // Oculta el Splash después del tiempo deseado
    }, 2000); // Cambia el número de milisegundos según lo que necesites
  }, []);
  const [textInput, setTextInput] = useState("");
  const [textFind, setTextFind] = useState("");

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
