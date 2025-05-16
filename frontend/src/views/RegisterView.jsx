// React
import { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";

// API
import { registerUser } from "../controllers/userController.js";

// Componentes
import {
  CustomTextBox,
  CustomTextBoxUser,
  CustomTextBoxPass,
} from "../components/TextInputComponent.jsx";
import { CustomButton } from "../components/ButtonComponent.jsx";

// Iconos
import RegisterImage from "../../assets/icons/AccountIcon.jsx";

export default function RegisterScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();

  const themeStyles = viewStyles(theme);

  const [nameInput, setNameInput] = useState("");
  const [lastnameInput, setLastnameInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [mailInput, setMailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [secondPassInput, setSecondPassInput] = useState("");

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
      <CustomButton
        text="Registrarse"
        onPress={() =>
          handleRegister(
            navigation,
            nameInput,
            lastnameInput,
            userInput,
            mailInput,
            passInput,
            secondPassInput,
            showAlert,
          )
        }
      />
    </SafeAreaView>
  );
}

async function handleRegister(
  navigation,
  nameInput,
  lastnameInput,
  userInput,
  mailInput,
  passInput,
  secondPassInput,
  showAlert,
) {
  const success = await registerUser(
    nameInput,
    lastnameInput,
    userInput,
    mailInput,
    passInput,
    secondPassInput,
    showAlert,
  );

  if (success) {
    navigation.reset({ index: 0, routes: [{ name: "LoginView" }] });
  }
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
