import { useState, useEffect, useContext } from "react";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext.jsx";

import { viewStyles } from "../styles/view-styles.jsx";

import { CustomButton } from "../components/button.jsx";
import {
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/text-input.jsx";
import { Popup } from "../components/popup.jsx";
import logo from "../../assets/bibliapp-logo-inicio.png";
import {
  handleLogin,
  validateUserToken,
} from "../controllers/AuthController.js";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const [userInput, setUserInput] = useState();
  const [passInput, setPassInput] = useState();

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [isViewReady, setIsViewReady] = useState(false);

  useEffect(() => {
    checkToken(navigation, setAlertMessage, setIsViewReady);
  }, [navigation]);

  useEffect(() => {
    if (isViewReady && alertMessage) {
      const timeout = setTimeout(() => {
        setAlert(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isViewReady, alertMessage]);

  return (
    <View style={[themeStyles.mainContainer, styles.view]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={themeStyles.p}>Usuario o correo electrónico:</Text>
        <CustomTextBoxUser
          placeholder={"Escribe tu usuario o correo"}
          value={userInput}
          onChangeText={setUserInput}
        />

        <Text style={themeStyles.p}>Contraseña:</Text>
        <CustomTextBoxPass
          placeholder={"Escribe tu contraseña"}
          value={passInput}
          onChangeText={setPassInput}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          text="Entrar"
          onPress={() =>
            onLoginPress(
              navigation,
              userInput,
              passInput,
              setAlert,
              setAlertMessage,
            )
          }
        />
        <Pressable onPress={() => handleRegister(navigation)}>
          <Text style={themeStyles.h5}>
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

async function checkToken(navigation, setAlertMessage, setIsViewReady) {
  const result = await validateUserToken(navigation);

  if (result?.error) {
    await SecureStore.deleteItemAsync("access_token");
    setAlertMessage(result.message);
  }
  setIsViewReady(true);
}

async function onLoginPress(
  navigation,
  userInput,
  passInput,
  setAlert,
  setAlertMessage,
) {
  const result = await handleLogin(
    { identifier: userInput, user_password: passInput },
    navigation,
  );

  if (result?.error) {
    setAlertMessage(result.message);
    setAlert(true);
  }
}

function handleRegister(navigation) {
  navigation.navigate("RegisterView");
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
