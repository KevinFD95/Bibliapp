import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { CustomTextBox } from "../components/text-input.jsx";
import { CustomButton } from "../components/button.jsx";
import Popup from "../components/popup.jsx";

import RegisterImage from "../../assets/icons/account-icon";
import viewStyles from "../styles/view-styles";

export default function RegisterScreen({ navigation }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [userInput, setUserInput] = useState();
  const [mailInput, setMailInput] = useState();
  const [passInput, setPassInput] = useState();
  const [secondPassInput, setSecondPassInput] = useState();

  const handleRegister = () => {
    if (!userInput) {
      setAlertMessage("Debe introducir un usuario válido");
      setAlertVisible(true);
      return;
    } else if (!mailInput) {
      setAlertMessage("Debe introducir un correo electrónico válido");
      setAlertVisible(true);
      return;
    } else if (!passInput) {
      setAlertMessage("Debe introducir una contraseña válida");
      setAlertVisible(true);
      return;
    } else if (secondPassInput !== passInput) {
      setAlertMessage("La contraseña no es la misma en los dos campos");
      setAlertVisible(true);
      return;
    } else {
      setConfirmVisible(true);
      // Añadir post request para registrar el usuario a la base de datos
    }
  };

  return (
    <View style={[viewStyles.mainContainer, { justifyContent: "center" }]}>
      <View style={styles.image}>
        <RegisterImage size={200} />
      </View>

      <View style={styles.inputContainer}>
        <Text>Nombre de usuario:</Text>
        <CustomTextBox
          placeholder={"Introduzca un nombre de usuario"}
          value={userInput}
          onChangeText={setUserInput}
        />
        <Text>Correo electrónico:</Text>
        <CustomTextBox
          placeholder={"Introduzca un correo electrónico"}
          value={mailInput}
          onChangeText={setMailInput}
        />
        <Text>Contraseña:</Text>
        <CustomTextBox
          placeholder={"Introduzca una contraseña"}
          value={passInput}
          onChangeText={setPassInput}
        />
        <Text>Repetir contraseña:</Text>
        <CustomTextBox
          placeholder={"Repita la contraseña anterior"}
          value={secondPassInput}
          onChangeText={setSecondPassInput}
        />
      </View>

      <CustomButton text="Registrarse" onPress={handleRegister} />

      <Popup
        visible={alertVisible}
        title={"Aviso"}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
      <Popup
        visible={confirmVisible}
        message={"Usuario registrado correctamente"}
        onClose={() => {
          setConfirmVisible(false);
          navigation.reset({ index: 0, routes: [{ name: "LoginView" }] });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 25,
  },
});
