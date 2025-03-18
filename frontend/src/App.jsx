import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/button";
import * as SplashScreen from "expo-splash-screen";
import color from "./config/colors.json";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync(); // Oculta el Splash después del tiempo deseado
    }, 2000); // Cambia el número de milisegundos según lo que necesites
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Text>Bibliapp</Text>
          <CustomButton text="Iniciar" onPress={() => alert("Botón")} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Comentario culete de Kevin gratis para Joan
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color["app-background"],
  },

  view: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
