// React
import { useState, useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Expo
import * as SecureStore from "expo-secure-store";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles";
import { styles } from "../styles/forgotpassStyles.js";

// API
import { forgotPassword } from "../api/auth.js";

// Componentes
import { CustomTextBoxUser } from "../components/TextInputComponent";
import { CustomButton } from "../components/ButtonComponent";

export default function ForgotPassView({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { showAlert, showConfirm } = useAlert();

  const themeStyles = viewStyles(theme);

  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={[themeStyles.mainContainer, styles.viewContainer]}>
      <View style={styles.title}>
        <Text style={themeStyles.h1}>Restablecer contraseña</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={themeStyles.h5}>Correo electrónico:</Text>
        <CustomTextBoxUser
          placeholder={"Escribe aquí tu correo electrónico"}
          onChangeText={setEmail}
          value={email}
        />
        <CustomButton
          text={"Recibir el código de restablecimiento"}
          onPress={() => sendEmail(navigation, email, showAlert, showConfirm)}
        />
      </View>
    </SafeAreaView>
  );
}

async function sendEmail(navigation, email, showAlert, showConfirm) {
  showConfirm({
    title: "Aviso",
    message: "¿Desea recibir el código para restablecer la contraseña?",
    onConfirm: async () => {
      const response = await forgotPassword(email);
      const { ok, status, data, message } = response;

      try {
        if (ok && status === 200) {
          await SecureStore.setItemAsync("resetToken", data.token);
          showAlert({
            title: "Aviso",
            message:
              "Se ha enviado un correo electrónico con el código de restablecimiento.",
          });
          handleReset(navigation, email);
        } else if (status === 404) {
          showAlert({
            title: "Error",
            message: message,
          });
        }
      } catch {
        showAlert({
          title: "Error",
          message: "Error al enviar el correo electrónico.",
        });
      }
    },
  });
}

function handleReset(navigation, email) {
  navigation.navigate("ResetPasswordView", email);
}
