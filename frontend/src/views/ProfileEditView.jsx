// React
import { useCallback, useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/profileEditStyles.js";

// API
import { updateProfile } from "../api/users.js";

// Componentes
import { CustomButton, IconButton } from "../components/ButtonComponent.jsx";
import {
  CustomTextBox,
  CustomTextBoxUser,
} from "../components/TextInputComponent.jsx";

// Iconos
import AccountIcon from "../../assets/icons/AccountIcon.jsx";
import AddPhotoIcon from "../../assets/icons/AddPhotoIcon.jsx";

export default function EditProfileScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();

  const themeStyles = viewStyles(theme);

  const { user } = route.params;

  const [user_name, setUser_name] = useState(user.user_name);
  const [user_lastname, setUser_lastname] = useState(user.user_lastname);
  const [email, setEmail] = useState(user.email);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Editar perfil" });
    }, [navigation]),
  );

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
        showAlert({
          title: "Éxito",
          message: "Cambios guardados correctamente",
        });
      } else {
        showAlert({ title: "Error", message: "Imposible guardar los cambios" });
      }
    } catch {
      showAlert({ title: "Error", message: "Imposible guardar los cambios" });
    }
  };

  return (
    <View style={themeStyles.mainContainer}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <AccountIcon size={200} />
          <View style={styles(theme).cameraContainer}>
            <Text>
              <IconButton
                onPress={() => alert("Añadir foto")}
                icon={<AddPhotoIcon size={28} />}
              />
            </Text>
          </View>
        </View>

        <View style={styles(theme).text}>
          <Text style={themeStyles.p}>Nombre: </Text>
          <CustomTextBox value={user_name} onChangeText={setUser_name} />
        </View>
        <View style={styles(theme).text}>
          <Text style={themeStyles.p}>Apellidos: </Text>
          <CustomTextBox
            value={user_lastname}
            onChangeText={setUser_lastname}
          />
        </View>
        <View style={styles(theme).text}>
          <Text style={themeStyles.p}>Correo Electronico: </Text>
          <CustomTextBoxUser value={email} onChangeText={setEmail} />
        </View>

        <CustomButton text={"Guardar cambios"} onPress={handleSave} />
      </ScrollView>
    </View>
  );
}
