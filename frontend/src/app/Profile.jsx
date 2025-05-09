import { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { viewStyles } from "../styles/globalStyles.js";

import * as SecureStore from "expo-secure-store";
import { logout } from "../api/auth.js";

import { IconButton } from "../components/ButtonComponent.jsx";

import EditIcon from "../../assets/icons/EditIcon.jsx";
import LogoutIcon from "../../assets/icons/LogoutIcon.jsx";
import AccountIcon from "../../assets/icons/AccountIcon.jsx";
import SettingsIcon from "../../assets/icons/SettingsIcon.jsx";
import AddPhotoIcon from "../../assets/icons/AddPhotoIcon.jsx";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileEdit from "./ProfileEditView.jsx";
import Config from "../views/SettingsView.jsx";
import { useNavigation } from "@react-navigation/native";
import { getProfile } from "../api/users.js";
import RefreshableView from "../components/RefreshableViewComponent.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={ProfileEdit} />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
}

function ProfileScreen() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const { showAlert, showConfirm } = useAlert();

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

  const onRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await getUserData();
  };

  const getUserData = async () => {
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
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProfile = (user) => {
    navigation.navigate("EditProfile", { user });
  };

  const handleConfig = () => {
    navigation.navigate("Config");
  };

  const handleLogout = async () => {
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
  };

  return (
    <View style={themeStyles.mainContainer}>
      <RefreshableView onRefresh={onRefresh}>
        <View style={styles.iconsBox}>
          <IconButton
            onPress={() => handleEditProfile(user)}
            icon={<EditIcon size={52} />}
          />
          <View>
            <AccountIcon size={200} />
            <View
              style={[
                styles.cameraContainer,
                {
                  backgroundColor: theme["app-background"],
                  borderColor: theme["selected-icons"],
                },
              ]}
            >
              <Text>
                <IconButton
                  onPress={() => alert("Añadir foto")}
                  icon={<AddPhotoIcon size={28} />}
                />
              </Text>
            </View>
          </View>
          <IconButton
            onPress={handleConfig}
            icon={<SettingsIcon size={52} />}
          />
        </View>

        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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

        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 20,
            marginBottom: 20,
          }}
        >
          <IconButton
            onPress={() =>
              showConfirm({
                title: "Cerrar sesión",
                message:
                  "¿Desea realmente cerrar sesión y salir de la aplicación?",
                onConfirm: handleLogout,
              })
            }
            icon={<LogoutIcon size={52} />}
          />
        </View>
      </RefreshableView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconsBox: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  image: {
    height: 150,
    width: 150,
    alignItems: "center",
  },
  textContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 20,
  },
  cameraContainer: {
    height: 60,
    width: 60,
    paddingLeft: 2,
    borderRadius: "100%",
    borderWidth: 2,
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
