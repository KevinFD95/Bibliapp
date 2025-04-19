import { useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import viewStyle from "../styles/view-styles.jsx";
import { CustomTextBox, CustomTextBoxUser } from "../components/text-input.jsx";
import { CustomButton } from "../components/button.jsx";
import { Popup } from "../components/popup.jsx";
import AccountIcon from "../../assets/icons/account-icon.jsx";
import { updateProfile } from "../api/users.js";

export default function EditProfileScreen({ route }) {
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
    <ScrollView contentContainerStyle={viewStyle.mainContainer}>
      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 50 }}>
        <AccountIcon size={200} />
      </View>

      <View style={styles.text}>
        <Text>Nombre: </Text>
        <CustomTextBox value={user_name} onChangeText={setUser_name} />
      </View>
      <View style={styles.text}>
        <Text>Apellidos: </Text>
        <CustomTextBox value={user_lastname} onChangeText={setUser_lastname} />
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
