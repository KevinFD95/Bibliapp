import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import CustomButton from './components/button'; 
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

    useEffect(() => {
      setTimeout(async () => {
        await SplashScreen.hideAsync(); // Oculta el Splash después del tiempo deseado
      }, 2000); // Cambia el número de milisegundos según lo que necesites
    }, []);

  return (
    <View style={styles.container}>
      <Text>Bibliapp</Text>
      <CustomButton text="Iniciar" onPress={() => alert("Botón")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
