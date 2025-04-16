import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import viewStyle from "../styles/view-styles.jsx";

import * as SecureStore from "expo-secure-store";
import { logout } from "../api/auth.js";

import { IconButton } from "../components/button.jsx";
import { ConfirmPopup, Popup } from "../components/popup.jsx";

import EditIcon from "../../assets/icons/edit-icon.jsx";
import LogoutIcon from "../../assets/icons/logout-icon.jsx";
import AccountIcon from "../../assets/icons/account-icon.jsx";
import SettingsIcon from "../../assets/icons/settings-icon.jsx";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileEdit from "./profile-edit.jsx";
import Config from "./config.jsx";
import { useNavigation } from "@react-navigation/native";
import { getProfile } from "../api/users.js";

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
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const navigation = useNavigation();

  const [user_name, setUser_name] = useState("");
  const [user_lastname, setUser_lastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const user = {
    user_name: user_name,
    user_lastname: user_lastname,
    email: email,
    username: username,
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getUserData = async () => {
        const response = await getProfile();
        const { ok, status, data } = response;

        if (ok || status === 200) {
          setUser_name(data.user.user_name);
          setUser_lastname(data.user.user_lastname);
          setUsername(data.user.username);
          setEmail(data.user.email);
        } else if (status === 404) {
          setAlertMessage("Hubo un error al buscar el usuario");
          setAlertVisible(true);
        } else {
          setAlertMessage("Hubo un error al buscar el usuario");
          setAlertVisible(true);
        }
      };

      getUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleEditProfile = (user) => {
    navigation.navigate("EditProfile", { user });
  };

  const handleConfig = (user) => {
    navigation.navigate("Config", user);
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
      setAlertMessage("Error al cerrar sesión. Inténtelo más tarde.");
      setAlertVisible(true);
    }
  };

  return (
    <View style={viewStyle.mainContainer}>
      <View style={styles.box}>
        <IconButton
          onPress={() => handleEditProfile(user)}
          icon={<EditIcon size={52} />}
        />
        <AccountIcon size={200} />
        <IconButton onPress={handleConfig} icon={<SettingsIcon size={52} />} />
      </View>

      <View style={styles.text}>
        <Text>Nombre de Usuario:</Text>
        <Text>{username}</Text>
      </View>
      <View style={styles.text}>
        <Text>Correo Electronico:</Text>
        <Text>{email}</Text>
      </View>
      <View style={styles.text}>
        <Text>Nombre:</Text>
        <Text>{user_name}</Text>
      </View>
      <View style={styles.text}>
        <Text>Apellido:</Text>
        <Text>{user_lastname}</Text>
      </View>

      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          left: "50%",
          marginBottom: 40,
        }}
      >
        <IconButton
          onPress={() => setConfirmVisible(true)}
          icon={<LogoutIcon size={52} />}
        />
      </View>

      <Popup
        title={"Aviso"}
        message={alertMessage}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <ConfirmPopup
        title={"Cerrando sesión"}
        message={"¿Desea realmente cerrar sesión y salir de la aplicación?"}
        visible={confirmVisible}
        onConfirm={() => {
          handleLogout();
          setConfirmVisible(false);
        }}
        onClose={() => setConfirmVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 150,
    width: 150,
    alignItems: "center",
  },
  text: {
    marginBottom: 20,
  },
});
