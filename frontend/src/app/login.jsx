import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import { useNavigation } from "@react-navigation/native";

import HomeScreen from "./home.jsx";

import { CustomButton } from "../components/button.jsx";
import { CustomTextBox } from "../components/text-input.jsx";

import viewStyles from "../styles/view-styles.jsx";
import logo from "../../assets/bibliapp-logo-inicio.png";

const Stack = createStackNavigator();

export default function LoginStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginView" component={LoginScreen} />
      <Stack.Screen name="HomeView" component={HomeScreen} />
      {/* <Stack.Screen name="RegisterView" component={RegisterScreen} /> */}
    </Stack.Navigator>
  );
}

export function LoginScreen() {
  //   const navigation = useNavigation();

  return (
    <View style={[viewStyles.mainContainer, styles.view]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <Text>Usuario o correo electrónico:</Text>
        <CustomTextBox placeholder={"Escribe tu usuario o correo"} />
        <Text>Contraseña:</Text>
        <CustomTextBox placeholder={"Escribe tu contraseña"} />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton text="Entrar" />
        <Pressable>
          <Text>¿Todavía no tienes cuenta? ¡Entra aquí!</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    marginVertical: 50,
  },
  buttonsContainer: {
    alignItems: "center",
  },
});
