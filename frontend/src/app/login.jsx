import { useState } from "react";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { CustomButton } from "../components/button.jsx";
import { CustomTextBox } from "../components/text-input.jsx";
import Popup from "../components/popup.jsx";

import TabNavigator from "../components/tab-navigator.jsx";
import RegisterScreen from "./register.jsx";

import viewStyles from "../styles/view-styles.jsx";
import logo from "../../assets/bibliapp-logo-inicio.png";

const Stack = createStackNavigator();

const users = [
  {
    username: "User",
    email: "User@gmail.com",
    password: "User",
    role: "user",
  },
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "admin",
  },
];

export default function LoginStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="LoginView"
        component={LoginScreen}
        options={{ unmountOnBlur: true }}
      />
      <Stack.Screen name="HomeView" component={TabNavigator} />
      <Stack.Screen name="RegisterView" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export function LoginScreen() {
  const navigation = useNavigation();

  const [userInput, setUserInput] = useState();
  const [passInput, setPassInput] = useState();

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const handleLogin = () => {
    if (!userInput || !passInput) {
      setAlertMessage("Por favor, completa todos los campos");
      setAlert(true);
      return;
    }

    const user = users.find(
      (u) =>
        (u.username === userInput || u.email === userInput) &&
        u.password === passInput,
    );

    if (user) {
      navigation.reset({ index: 0, routes: [{ name: "HomeView" }] });
    } else {
      setAlertMessage("Usuario o contraseña incorrectos");
      setAlert(true);
    }
  };

  const handleRegister = () => {
    navigation.navigate("RegisterView");
  };

  return (
    <View style={[viewStyles.mainContainer, styles.view]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <Text>Usuario o correo electrónico:</Text>
        <CustomTextBox
          placeholder={"Escribe tu usuario o correo"}
          value={userInput}
          onChangeText={setUserInput}
        />
        <Text>Contraseña:</Text>
        <CustomTextBox
          placeholder={"Escribe tu contraseña"}
          value={passInput}
          onChangeText={setPassInput}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton text="Entrar" onPress={handleLogin} />
        <Pressable onPress={handleRegister}>
          <Text>¿Todavía no tienes cuenta? ¡Entra aquí!</Text>
        </Pressable>
      </View>

      <Popup
        visible={alert}
        title={"Error"}
        message={alertMessage}
        onClose={() => setAlert(false)}
      />
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
