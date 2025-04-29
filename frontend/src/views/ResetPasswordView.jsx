import { useState, useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeContext } from "../context/ThemeContext.jsx";
import { viewStyles } from "../styles/globalStyles";

import {
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/TextInputComponent";
import { CustomButton } from "../components/ButtonComponent";

import { Popup } from "../components/PopupComponent.jsx";

import { resetPassword } from "../api/auth.js";
import { passwordValidation } from "../validators/registerValidation.js";

export default function ForgotPassView({ navigation, route }) {
  const email = route.params;
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
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

      <Text style={themeStyles.h5}>Nueva contraseña:</Text>
      <CustomTextBoxPass
        placeholder={"Escribe aquí tu nueva contraseña"}
        onChangeText={setNewPassword}
        value={newPassword}
      />
      <Text style={themeStyles.h5}>Repetir contraseña:</Text>
      <CustomTextBoxPass
        placeholder={"Escribe de nuevo tu nueva contraseña"}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <Text style={themeStyles.h5}>Código de restablecimiento:</Text>
      <CustomTextBoxUser
        placeholder={"Introduce aquí el código para restablecer la contraseña"}
        onChangeText={setResetCode}
        value={resetCode}
      />
      <CustomButton
        text={"Restablecer contraseña"}
        onPress={sendPassword(
          navigation,
          email,
          setAlertMessage,
          setAlertVisible,
          setError,
          setErrorVisible,
          newPassword,
          confirmPassword,
          resetCode,
        )}
      />

      <Popup
        title={"Aviso"}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          handleLogin(navigation);
        }}
        visible={alertVisible}
      />
      <Popup
        title={"Error"}
        message={error}
        visible={errorVisible}
        onClose={() => setError(false)}
      />
    </SafeAreaView>
  );
}

async function sendPassword(
  navigation,
  email,
  setAlertMessage,
  setAlertVisible,
  setError,
  setErrorVisible,
  newPassword,
  confirmPassword,
  resetCode,
) {
  if (resetCode === "" || newPassword === "" || confirmPassword === "") {
    setError("Complete todos los campos.");
    setErrorVisible(true);
    return;
  } else if (newPassword !== confirmPassword) {
    setError("Las contraseñas no coinciden");
    setErrorVisible(true);
    return;
  } else if (!passwordValidation(newPassword)) {
    setError(
      "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número y un símbolo.",
    );
    setErrorVisible(true);
    return;
  } else {
    try {
      const response = await resetPassword(email, resetCode, newPassword);
      const { ok, status } = response;

      if (ok && status === 200) {
        setAlertMessage("Contraseña restablecida correctamente.");
        setAlertVisible(true);
      } else if (status === 400) {
        setError("No se ha podido cambiar la contraseña.");
        setErrorVisible(true);
      }
    } catch {
      setError("Error al restablecer la contraseña.");
      setErrorVisible(true);
    }
  }
}

function handleLogin(navigation) {
  navigation.reset({ index: 0, routes: [{ name: "LoginView" }] });
}
