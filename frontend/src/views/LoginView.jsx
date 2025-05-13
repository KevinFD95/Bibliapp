import { useState, useEffect, useContext } from "react";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext.jsx";

import { viewStyles } from "../styles/globalStyles.js";

import { CustomButton } from "../components/ButtonComponent.jsx";
import {
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/TextInputComponent.jsx";
import { Popup } from "../components/PopupComponent.jsx";
import LightLogo from "../../assets/bibliapp-logo-inicio.png";
import DarkLogo from "../../assets/bibliapp-icon-loading.png";
import {
  handleLogin,
  validateUserToken,
} from "../controllers/authController.js";
import * as SecureStore from "expo-secure-store";

import { useCart } from "../context/CartContext.jsx";

export default function LoginScreen() {
  const { fetchCartItems } = useCart();
  const navigation = useNavigation();
  const { mode } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const logo = mode === "dark" ? DarkLogo : LightLogo;

  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");

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

        <Pressable onPress={() => handleForgotPass(navigation)}>
          <Text style={[themeStyles.h5, { textAlign: "center" }]}>
            He olvidado mi contraseña
          </Text>
        </Pressable>
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
              fetchCartItems,
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
  fetchCartItems,
) {
  const result = await handleLogin(
    { identifier: userInput, user_password: passInput },
    navigation,
  );

  if (result?.error) {
    setAlertMessage(result.message);
    setAlert(true);
  } else {
    await fetchCartItems();
  }
}

function handleRegister(navigation) {
  navigation.navigate("RegisterView");
}

function handleForgotPass(navigation) {
  navigation.navigate("ForgotPassView");
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
