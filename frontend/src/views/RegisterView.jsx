import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import {
  CustomTextBox,
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/TextInput.jsx";
import { CustomButton } from "../components/Button.jsx";
import { Popup } from "../components/Popup.jsx";

import RegisterImage from "../../assets/icons/AccountIcon.jsx";
import { viewStyles } from "../styles/GlobalStyles.js";

import { RegisterController } from "../controllers/UserController.js";

import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function RegisterScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const {
    nameInput,
    lastnameInput,
    userInput,
    mailInput,
    passInput,
    secondPassInput,
    setNameInput,
    setLastnameInput,
    setUserInput,
    setMailInput,
    setPassInput,
    setSecondPassInput,
    alertVisible,
    alertMessage,
    confirmVisible,
    handleRegister,
    closeAlert,
    closeConfirm,
  } = RegisterController(navigation);

  return (
    <SafeAreaView
      style={[themeStyles.mainContainer, { justifyContent: "center", flex: 1 }]}
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
        onClose={closeAlert}
      />
      <Popup
        visible={confirmVisible}
        message={"Usuario registrado correctamente"}
        onClose={closeConfirm}
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
