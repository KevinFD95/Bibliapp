// React
import { useCallback, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Expo
import * as SecureStore from "expo-secure-store";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/profileStyles.js";

// API
import { getProfile } from "../api/users.js";
import { logout } from "../api/auth.js";

// Componentes
import RefreshableView from "../components/RefreshableViewComponent.jsx";
import { IconButton } from "../components/ButtonComponent.jsx";

// Iconos
import EditIcon from "../../assets/icons/EditIcon.jsx";
import LogoutIcon from "../../assets/icons/LogoutIcon.jsx";
import AccountIcon from "../../assets/icons/AccountIcon.jsx";
import SettingsIcon from "../../assets/icons/SettingsIcon.jsx";

export default function ProfileScreen() {
  const { theme } = useContext(ThemeContext);
  const { showAlert, showConfirm } = useAlert();

  const themeStyles = viewStyles(theme);

  const navigation = useNavigation();

  const [user_name, setUser_name] = useState("");
  const [user_lastname, setUser_lastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [subscription, setSubscription] = useState("");

  const user = {
    user_name: user_name,
    user_lastname: user_lastname,
    email: email,
    username: username,
  };

  useEffect(() => {
    getUserData(
      setUser_name,
      setUser_lastname,
      setUsername,
      setEmail,
      setSubscription,
      showAlert,
    );
  }, [
    setUser_name,
    setUser_lastname,
    setUsername,
    setEmail,
    setSubscription,
    showAlert,
  ]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Perfil" });
    }, [navigation]),
  );

  return (
    <View style={[themeStyles.mainContainer]}>
      <RefreshableView
        onRefresh={() =>
          onRefresh(
            setUser_name,
            setUser_lastname,
            setUsername,
            setEmail,
            setSubscription,
            showAlert,
          )
        }
      >
        <View style={styles.iconsBox}>
          <IconButton
            onPress={() => handleEditProfile(navigation, user)}
            icon={<EditIcon size={52} />}
          />

          <AccountIcon size={200} />

          <IconButton
            onPress={() => handleConfig(navigation)}
            icon={<SettingsIcon size={52} />}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={themeStyles.h5}>Nombre: </Text>
            <Text style={themeStyles.p}>{user_name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={themeStyles.h5}>Nivel: </Text>
            <Text style={themeStyles.p}>{subscription}</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={themeStyles.h5}>Apellido: </Text>
          <Text style={themeStyles.p}>{user_lastname}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={themeStyles.h5}>Usuario: </Text>
          <Text style={themeStyles.p}>{username}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={themeStyles.h5}>Correo Electronico: </Text>
          <Text style={themeStyles.p}>{email}</Text>
        </View>

        <View style={styles.logoutContainer}>
          <IconButton
            onPress={() =>
              showConfirm({
                title: "Cerrar sesión",
                message:
                  "¿Desea realmente cerrar sesión y salir de la aplicación?",
                onConfirm: () => handleLogout(navigation, showAlert),
              })
            }
            icon={<LogoutIcon size={52} />}
          />
        </View>
      </RefreshableView>
    </View>
  );
}

async function onRefresh(
  setUser_name,
  setUser_lastname,
  setUsername,
  setEmail,
  setSubscription,
  showAlert,
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  await getUserData(
    setUser_name,
    setUser_lastname,
    setUsername,
    setEmail,
    setSubscription,
    showAlert,
  );
}

async function getUserData(
  setUser_name,
  setUser_lastname,
  setUsername,
  setEmail,
  setSubscription,
  showAlert,
) {
  const response = await getProfile();
  const { ok, status, data } = response;

  if (ok || status === 200) {
    setUser_name(data.user.user_name);
    setUser_lastname(data.user.user_lastname);
    setUsername(data.user.username);
    setEmail(data.user.email);
    setSubscription(data.user.user_sub);
  } else if (status === 404) {
    showAlert({
      title: "Error",
      message: "Hubo un error al buscar el usuario",
    });
  } else {
    showAlert({
      title: "Error",
      message: "Hubo un error al buscar el usuario",
    });
  }
}

function handleEditProfile(navigation, user) {
  navigation.navigate("EditProfile", { user });
}

function handleConfig(navigation) {
  navigation.navigate("Config");
}

async function handleLogout(navigation, showAlert) {
  try {
    const response = await logout();
    const { ok, status } = response;

    if (ok || status === 200) {
      await SecureStore.deleteItemAsync("access_token");
      navigation.reset({ index: 0, routes: [{ name: "LoginView" }] });
    }
  } catch {
    showAlert({
      title: "Error",
      message: "Error al cerrar sesión. Inténtelo más tarde.",
    });
  }
}
