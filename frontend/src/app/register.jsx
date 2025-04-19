import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  CustomTextBox,
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/text-input.jsx";
import { CustomButton } from "../components/button.jsx";
import { Popup } from "../components/popup.jsx";

import RegisterImage from "../../assets/icons/account-icon";
import viewStyles from "../styles/view-styles";

import {
  userNameValidation,
  userLastnameValidation,
  userValidation,
  emailValidation,
  passwordValidation,
} from "../validators/register_validator.js";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { register } from "../api/auth.js";

export default function RegisterScreen({ navigation }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [nameInput, setNameInput] = useState();
  const [lastnameInput, setLastnameInput] = useState();
  const [userInput, setUserInput] = useState();
  const [mailInput, setMailInput] = useState();
  const [passInput, setPassInput] = useState();
  const [secondPassInput, setSecondPassInput] = useState();

  const user = {
    user_name: nameInput,
    user_lastname: lastnameInput,
    username: userInput,
    email: mailInput,
    user_password: passInput,
  };

  const handleRegister = async () => {
    if (!nameInput || !userNameValidation(nameInput)) {
      setAlertMessage("Debe introducir un nombre válido");
      setAlertVisible(true);
      return;
    }

    if (!lastnameInput || !userLastnameValidation(lastnameInput)) {
      setAlertMessage("Debe introducir unos apellidos válidos");
      setAlertVisible(true);
      return;
    }

    if (!userInput || !userValidation(userInput)) {
      setAlertMessage("Debe introducir un usuario válido");
      setAlertVisible(true);
      return;
    }

    if (!mailInput || !emailValidation(mailInput)) {
      setAlertMessage("Debe introducir un correo electrónico válido");
      setAlertVisible(true);
      return;
    }

    if (!passInput || !passwordValidation(passInput)) {
      setAlertMessage(
        "Debe introducir una contraseña válida: Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
      );
      setAlertVisible(true);
      return;
    }

    if (secondPassInput !== passInput) {
      setAlertMessage("La contraseña no es la misma en los dos campos");
      setAlertVisible(true);
      return;
    }

    try {
      const response = await register(user);
      const { ok, status } = response;

      if (ok && status === 201) {
        setConfirmVisible(true);
      } else {
        setAlertMessage("El usuario no ha podido ser registrado");
        setAlertVisible(true);
      }
    } catch {
      setAlertMessage("Imposible registrar el usuario, inténtelo más tarde.");
      setAlertVisible(true);
    }
  };

  return (
    <SafeAreaView
      style={[viewStyles.mainContainer, { justifyContent: "center", flex: 1 }]}
    >
      <View style={styles.image}>
        <RegisterImage size={200} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.inputContainer}
      >
        <Text>Nombre:</Text>
        <CustomTextBox
          placeholder={"Introduzca un nombre de usuario"}
          value={nameInput}
          onChangeText={setNameInput}
        />
        <Text>Apellidos:</Text>
        <CustomTextBox
          placeholder={"Introduzca un nombre de usuario"}
          value={lastnameInput}
          onChangeText={setLastnameInput}
        />
        <Text>Usuario:</Text>
        <CustomTextBoxUser
          placeholder={"Introduzca un nombre de usuario"}
          value={userInput}
          onChangeText={setUserInput}
        />
        <Text>Correo electrónico:</Text>
        <CustomTextBoxUser
          placeholder={"Introduzca un correo electrónico"}
          value={mailInput}
          onChangeText={setMailInput}
        />
        <Text>Contraseña:</Text>
        <CustomTextBoxPass
          placeholder={"Introduzca una contraseña"}
          value={passInput}
          onChangeText={setPassInput}
        />
        <Text>Repetir contraseña:</Text>
        <CustomTextBoxPass
          placeholder={"Repita la contraseña anterior"}
          value={secondPassInput}
          onChangeText={setSecondPassInput}
        />
      </ScrollView>
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
    </SafeAreaView>
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
