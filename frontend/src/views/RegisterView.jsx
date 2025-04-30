import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import {
  CustomTextBox,
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/TextInputComponent.jsx";
import { CustomButton } from "../components/ButtonComponent.jsx";
import { Popup } from "../components/PopupComponent.jsx";

import RegisterImage from "../../assets/icons/AccountIcon.jsx";
import { viewStyles } from "../styles/globalStyles.js";

import { RegisterController } from "../controllers/userController.js";

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
        contentContainerStyle={styles.inputView}
      >
        <View style={styles.inputContainer}>
          <Text style={themeStyles.h5}>Nombre:</Text>
          <CustomTextBox
            placeholder={"Introduzca un nombre de usuario"}
            value={nameInput}
            onChangeText={setNameInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={themeStyles.h5}>Apellidos:</Text>
          <CustomTextBox
            placeholder={"Introduzca un nombre de usuario"}
            value={lastnameInput}
            onChangeText={setLastnameInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={themeStyles.h5}>Usuario:</Text>
          <CustomTextBoxUser
            placeholder={"Introduzca un nombre de usuario"}
            value={userInput}
            onChangeText={setUserInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={themeStyles.h5}>Correo electrónico:</Text>
          <CustomTextBoxUser
            placeholder={"Introduzca un correo electrónico"}
            value={mailInput}
            onChangeText={setMailInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={themeStyles.h5}>Contraseña:</Text>
          <CustomTextBoxPass
            placeholder={"Introduzca una contraseña"}
            value={passInput}
            onChangeText={setPassInput}
          />
          <Text style={[themeStyles.required, styles.requiredText]}>
            * Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un
            símbolo.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={themeStyles.h5}>Repetir contraseña:</Text>
          <CustomTextBoxPass
            placeholder={"Repita la contraseña anterior"}
            value={secondPassInput}
            onChangeText={setSecondPassInput}
          />
        </View>
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
  inputView: {
    marginVertical: 25,
  },
  inputContainer: {
    marginVertical: 5,
  },
  requiredText: {
    marginTop: -15,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
