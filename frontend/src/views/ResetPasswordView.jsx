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
import { styles } from "../styles/resetpassStyles.js";

// API
import { resetPassword } from "../api/auth.js";
import { passwordValidation } from "../validators/registerValidation.js";

// Componentens
import { CustomButton } from "../components/ButtonComponent";
import {
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/TextInputComponent";

export default function ForgotPassView({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();

  const email = route.params;
  const themeStyles = viewStyles(theme);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");

  return (
    <SafeAreaView style={[themeStyles.mainContainer, styles.viewContainer]}>
      <View style={styles.title}>
        <Text style={[themeStyles.h1, { textAlign: "center" }]}>
          Restablecer contraseña
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={themeStyles.h5}>Nueva contraseña:</Text>
        <CustomTextBoxPass
          placeholder={"Escribe aquí tu nueva contraseña"}
          onChangeText={setNewPassword}
          value={newPassword}
        />
        <Text style={[themeStyles.required, styles.requiredText]}>
          * Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un
          símbolo.
        </Text>
        <Text style={themeStyles.h5}>Repetir contraseña:</Text>
        <CustomTextBoxPass
          placeholder={"Escribe de nuevo tu nueva contraseña"}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <Text style={themeStyles.h5}>Código de restablecimiento:</Text>
        <CustomTextBoxUser
          placeholder={
            "Introduce aquí el código para restablecer la contraseña"
          }
          onChangeText={setResetCode}
          value={resetCode}
        />
        <CustomButton
          text={"Restablecer contraseña"}
          onPress={() =>
            sendPassword(
              navigation,
              email,
              showAlert,
              newPassword,
              confirmPassword,
              resetCode,
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

async function sendPassword(
  navigation,
  email,
  showAlert,
  newPassword,
  confirmPassword,
  resetCode,
) {
  if (resetCode === "" || newPassword === "" || confirmPassword === "") {
    showAlert({ title: "Aviso", message: "Complete todos los campos." });
    return;
  } else if (newPassword !== confirmPassword) {
    showAlert({ title: "Aviso", message: "Las contraseñas no coinciden" });
    return;
  } else if (!passwordValidation(newPassword)) {
    showAlert({
      title: "Aviso",
      message:
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.",
    });
    return;
  } else {
    try {
      const token = await SecureStore.getItemAsync("resetToken");
      const response = await resetPassword(
        email,
        token,
        resetCode,
        newPassword,
      );
      const { ok, status, message } = response;

      if (ok && status === 200) {
        showAlert({
          title: "Éxito",
          message: message,
        });
        await SecureStore.deleteItemAsync("resetToken");
        handleLogin(navigation);
      } else if (status === 400) {
        showAlert({
          title: "Error",
          message: message,
        });
        await SecureStore.deleteItemAsync("resetToken");
      }
    } catch {
      showAlert({
        title: "Error",
        message: "Error al restablecer la contraseña",
      });
      await SecureStore.deleteItemAsync("resetToken");
    }
  }
}

function handleLogin(navigation) {
  navigation.reset({ index: 0, routes: [{ name: "LoginView" }] });
}
