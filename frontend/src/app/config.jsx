import { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import viewStyle from "../styles/view-styles.jsx";
import SwitchComponent from "../components/switch.jsx";

import { IconButton } from "../components/button.jsx";

import LightModeIcon from "../../assets/icons/light-mode-icon.jsx";
import DarkModeIcon from "../../assets/icons/dark-mode-icon.jsx";

export default function HomeStackNavigator() {
  const [lightmode, setLightmode] = useState(true);
  const [darkmode, setDarkmode] = useState(false);
  const [setSwitchState] = useState(false);

  const handleSwitchChange = (newState) => {
    setSwitchState(newState);
    console.log("Nuevo estado del switch:", newState);
  };

  return (
    <View style={viewStyle.mainContainer}>
      <View style={styles.row}>
        <Text style={viewStyle.h5}>Tema</Text>
        <View style={styles.icons}>
          <IconButton
            onPress={() => {
              if (!lightmode) {
                alert("Tema claro");
                setLightmode(!lightmode);
                setDarkmode(!darkmode);
              }
            }}
            icon={<LightModeIcon size={48} filled={lightmode} />}
          />
          <IconButton
            onPress={() => {
              if (!darkmode) {
                alert("Tema oscuro");
                setDarkmode(!darkmode);
                setLightmode(!lightmode);
              }
            }}
            icon={<DarkModeIcon size={48} filled={darkmode} />}
          />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={viewStyle.h5}>Notificaciones</Text>
          <SwitchComponent onChange={handleSwitchChange} />
        </View>
        <View style={styles.row}>
          <Text style={viewStyle.h5}>Recordatorio de lectura</Text>
          <SwitchComponent onChange={handleSwitchChange} />
        </View>
        <View style={styles.row}>
          <Text style={viewStyle.h5}>Recomendaciones de libros</Text>
          <SwitchComponent onChange={handleSwitchChange} />
        </View>
        <View style={styles.linkContainer}>
          <Pressable onPress={() => alert("Método de pago")}>
            <Text style={viewStyle.h4}>Modificar método de pago</Text>
          </Pressable>
          <Pressable onPress={() => alert("Suscripción")}>
            <Text style={viewStyle.h4}>Suscripción premium</Text>
          </Pressable>
          <Pressable onPress={() => alert("Historial")}>
            <Text style={viewStyle.h4}>Historial de compras</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  icons: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 15,
  },

  box: {
    flexGrow: 1,
    marginTop: 50,
  },

  linkContainer: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
});
