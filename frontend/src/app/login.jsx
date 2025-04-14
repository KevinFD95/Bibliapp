import { useState, useEffect } from "react";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { login, validateToken } from "../api/auth.js";

import { CustomButton } from "../components/button.jsx";
import { CustomTextBox, CustomTextBoxPass } from "../components/text-input.jsx";
import { Popup } from "../components/popup.jsx";

import TabNavigator from "../components/tab-navigator.jsx";
import RegisterScreen from "./register.jsx";

import viewStyles from "../styles/view-styles.jsx";
import logo from "../../assets/bibliapp-logo-inicio.png";
import CheckboxIcon from "../../assets/icons/checkbox-icon.jsx";

const Stack = createStackNavigator();

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
  const user = { identifier: userInput, user_password: passInput };
  const [checked, setChecked] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [isViewReady, setIsViewReady] = useState(false);

  useEffect(() => {
    const validateUserToken = async () => {
      const token = await SecureStore.getItemAsync("access_token");

      if (!token) return;

      try {
        const response = await validateToken();

        if (response.success) {
          navigation.reset({ index: 0, routes: [{ name: "HomeView" }] });
        } else {
          await SecureStore.deleteItemAsync("access_token");
          setAlertMessage("Sesión caducada. Vuelva a iniciar sesión");
        }
      } catch {
        await SecureStore.deleteItemAsync("access_token");
        setAlertMessage("Sesión caducada. Vuelva a iniciar sesión");
      }

      setIsViewReady(true);
    };

    validateUserToken();
  }, [navigation]);

  useEffect(() => {
    if (isViewReady && alertMessage) {
      const timeout = setTimeout(() => {
        setAlert(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isViewReady, alertMessage]);

  const handleLogin = async () => {
    if (!userInput || !passInput) {
      setAlertMessage("Por favor, completa todos los campos");
      setAlert(true);
      return;
    }

    try {
      const data = await login(user);

      if (data.success === true && data.access_token) {
        await SecureStore.setItemAsync("access_token", data.access_token);
        navigation.reset({ index: 0, routes: [{ name: "HomeView" }] });
      } else {
        setAlertMessage("Usuario o contraseña incorrectos");
      }
    } catch {
      setAlertMessage("Error al iniciar sesión");
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
        <Text style={viewStyles.p}>Usuario o correo electrónico:</Text>
        <CustomTextBox
          placeholder={"Escribe tu usuario o correo"}
          value={userInput}
          onChangeText={setUserInput}
        />

        <Text style={viewStyles.p}>Contraseña:</Text>
        <CustomTextBoxPass
          placeholder={"Escribe tu contraseña"}
          value={passInput}
          onChangeText={setPassInput}
        />

        <Pressable onPress={() => !setChecked(!checked)} style={styles.row}>
          <CheckboxIcon size={32} checked={checked} />
          <Text style={viewStyles.h5}>Recuérdame</Text>
        </Pressable>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton text="Entrar" onPress={handleLogin} />
        <Pressable onPress={handleRegister}>
          <Text style={viewStyles.h5}>
            ¿Todavía no tienes cuenta? ¡Entra aquí!
          </Text>
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

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
  },

  buttonsContainer: {
    alignItems: "center",
  },
});
