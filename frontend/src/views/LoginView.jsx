// React
import { useState, useEffect, useContext } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Expo
import * as SecureStore from "expo-secure-store";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { useCart } from "../context/CartContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/loginStyles.js";

// Componentes
import { CustomButton } from "../components/ButtonComponent.jsx";
import {
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/TextInputComponent.jsx";
import {
  handleLogin,
  validateUserToken,
} from "../controllers/authController.js";

// Imágenes
import LightLogo from "../../assets/bibliapp-logo-inicio.png";
import DarkLogo from "../../assets/bibliapp-icon-loading.png";

export default function LoginScreen() {
  const navigation = useNavigation();

  const { theme, mode } = useContext(ThemeContext);
  const { showAlert } = useAlert();
  const { fetchCartItems } = useCart();

  const themeStyles = viewStyles(theme);

  const logo = mode === "dark" ? DarkLogo : LightLogo;

  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");

  useEffect(() => {
    checkToken(navigation, showAlert);
  }, [navigation, showAlert]);

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
              showAlert,
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
    </View>
  );
}

async function checkToken(navigation, showAlert) {
  const result = await validateUserToken(navigation);

  if (result?.error) {
    await SecureStore.deleteItemAsync("access_token");

    setTimeout(() => {
      showAlert({
        title: "Sesión caducada",
        message: "Introduce tus datos para volver a iniciar sesión.",
      });
    }, 3000);
  }
}

async function onLoginPress(
  navigation,
  userInput,
  passInput,
  showAlert,
  fetchCartItems,
) {
  const result = await handleLogin(
    { identifier: userInput, user_password: passInput },
    navigation,
  );

  if (result?.error) {
    showAlert({ title: "Error", message: result.message });
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
