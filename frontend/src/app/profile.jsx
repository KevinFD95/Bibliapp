import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import viewStyle from "../styles/view-styles.jsx";

import { IconButton } from "../components/button.jsx";
import { ConfirmPopup, Popup } from "../components/popup.jsx";

import EditIcon from "../../assets/icons/edit-icon.jsx";
import LogoutIcon from "../../assets/icons/logout-icon.jsx";
import AccountIcon from "../../assets/icons/account-icon.jsx";
import SettingsIcon from "../../assets/icons/settings-icon.jsx";

export default function HomeStackNavigator() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <View style={viewStyle.mainContainer}>
      <View style={styles.box}>
        <IconButton
          onPress={() => setAlertVisible(true)}
          icon={<EditIcon size={52} />}
        />
        <AccountIcon size={200} />
        <IconButton
          onPress={() => setAlertVisible(true)}
          icon={<SettingsIcon size={52} />}
        />
      </View>

      <View style={styles.text}>
        <Text>Nombre de Usuario:</Text>
        <Text>joan005</Text>
      </View>
      <View style={styles.text}>
        <Text>Correo Electronico:</Text>
        <Text>joancarmona05@gmail.com</Text>
      </View>
      <View style={styles.text}>
        <Text>Nombre:</Text>
        <Text>joan</Text>
      </View>
      <View style={styles.text}>
        <Text>Apellido:</Text>
        <Text>Carmona</Text>
      </View>
      <View style={styles.text}>
        <Text>Direccion:</Text>
        <Text>C/ MiCasa Nº1</Text>
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
        title={"Alerta"}
        message={"Cambio de ventana"}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <ConfirmPopup
        title={"Cerrando sesión"}
        message={"¿Desea realmente cerrar sesión y salir de la aplicación?"}
        visible={confirmVisible}
        onConfirm={() => {}}
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
