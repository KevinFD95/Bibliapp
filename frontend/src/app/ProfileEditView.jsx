import { useContext, useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { viewStyles } from "../styles/globalStyles.js";
import {
  CustomTextBox,
  CustomTextBoxUser,
} from "../components/TextInputComponent.jsx";
import { CustomButton } from "../components/ButtonComponent.jsx";
import { Popup } from "../components/PopupComponent.jsx";
import AccountIcon from "../../assets/icons/AccountIcon.jsx";
import { updateProfile } from "../api/users.js";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function EditProfileScreen({ route }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const { user } = route.params;

  const [alertMessage, setAlertMessage] = useState();
  const [alertVisible, setAlertVisible] = useState(false);

  const [user_name, setUser_name] = useState(user.user_name);
  const [user_lastname, setUser_lastname] = useState(user.user_lastname);
  const [email, setEmail] = useState(user.email);

  const newUser = {
    user_name: user_name,
    user_lastname: user_lastname,
    email: email,
    username: user.username,
  };

  const handleSave = async () => {
    try {
      const response = await updateProfile(newUser);
      const { ok, status } = response;

      if (ok || status === 200) {
        setAlertMessage("Cambios guardados");
        setAlertVisible(true);
      } else {
        setAlertMessage("Imposible guardar cambios");
        setAlertVisible(true);
      }
    } catch {
      alert("Error");
    }
  };

  return (
    <View style={themeStyles.mainContainer}>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 10, marginBottom: 50 }}>
          <AccountIcon size={200} />
        </View>

        <View style={styles.text}>
          <Text>Nombre: </Text>
          <CustomTextBox value={user_name} onChangeText={setUser_name} />
        </View>
        <View style={styles.text}>
          <Text>Apellidos: </Text>
          <CustomTextBox
            value={user_lastname}
            onChangeText={setUser_lastname}
          />
        </View>
        <View style={styles.text}>
          <Text>Correo Electronico: </Text>
          <CustomTextBoxUser value={email} onChangeText={setEmail} />
        </View>
        <CustomButton text={"Guardar cambios"} onPress={handleSave} />

        <Popup
          title={"Aviso"}
          message={alertMessage}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    marginBottom: 20,
  },
});
