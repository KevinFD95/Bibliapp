import { useState, useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeContext } from "../context/ThemeContext.jsx";
import { viewStyles } from "../styles/globalStyles";

import { CustomTextBoxUser } from "../components/TextInputComponent";
import { CustomButton } from "../components/ButtonComponent";

import { Popup } from "../components/PopupComponent.jsx";
import { forgotPassword } from "../api/auth.js";

export default function ForgotPassView({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState("");

  return (
    <SafeAreaView
      style={[themeStyles.mainContainer, { flex: 1, justifyContent: "center" }]}
    >
      <Text style={[themeStyles.h1, { textAlign: "center" }]}>
        Restablecer contraseña
      </Text>
      <Text style={themeStyles.h5}>Correo electrónico:</Text>
      <CustomTextBoxUser
        placeholder={"Escribe aquí tu correo electrónico"}
        onChangeText={setEmail}
        value={email}
      />
      <CustomButton
        text={"Recibir el código de restablecimiento"}
        onPress={() =>
          sendEmail(
            email,
            setAlertVisible,
            setAlertMessage,
            setError,
            setErrorVisible,
          )
        }
      />

      <Popup
        title={"Aviso"}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          handleReset(navigation, email);
        }}
        visible={alertVisible}
      />
      <Popup
        title={"Error"}
        message={error}
        visible={errorVisible}
        on
        onClose={() => setError(false)}
      />
    </SafeAreaView>
  );
}

async function sendEmail(
  email,
  setAlertVisible,
  setAlertMessage,
  setError,
  setErrorVisible,
) {
  try {
    const response = await forgotPassword(email);
    const { ok, status } = response;
    if (ok && status === 200) {
      setAlertMessage(
        "Se ha enviado un correo electrónico con el código de restablecimiento.",
      );
      setAlertVisible(true);
    }
  } catch {
    setError("Error al enviar el correo electrónico.");
    setErrorVisible(true);
  }
}

function handleReset(navigation, email) {
  navigation.navigate("ResetPasswordView", email);
}
