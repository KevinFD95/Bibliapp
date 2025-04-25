import { useContext } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { viewStyles } from "../styles/globalStyles.js";
import CustomSwitch from "../components/SwitchComponent.jsx";

import { IconButton } from "../components/ButtonComponent.jsx";

import LightModeIcon from "../../assets/icons/LightModeIcon.jsx";
import DarkModeIcon from "../../assets/icons/DarkModeIcon.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function HomeStackNavigator() {
  const { theme, mode, toggleTheme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const lightmode = mode === "light";
  const darkmode = mode === "dark";

  return (
    <View style={themeStyles.mainContainer}>
      <View style={styles.row}>
        <Text style={themeStyles.h5}>Tema</Text>
        <View style={styles.icons}>
          <IconButton
            onPress={() => {
              if (!lightmode) {
                if (!lightmode) toggleTheme("light");
              }
            }}
            icon={<LightModeIcon size={48} filled={lightmode} />}
          />
          <IconButton
            onPress={() => {
              if (!darkmode) {
                if (!darkmode) toggleTheme("dark");
              }
            }}
            icon={<DarkModeIcon size={48} filled={darkmode} />}
          />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={themeStyles.h5}>Notificaciones</Text>
          <CustomSwitch onValueChange={() => alert("Cambio de switch")} />
        </View>
        <View style={styles.row}>
          <Text style={themeStyles.h5}>Recordatorio de lectura</Text>
          <CustomSwitch onValueChange={() => alert("Cambio de switch")} />
        </View>
        <View style={styles.row}>
          <Text style={themeStyles.h5}>Recomendaciones de libros</Text>
          <CustomSwitch onValueChange={() => alert("Cambio de switch")} />
        </View>
        <View style={styles.linkContainer}>
          <Pressable onPress={() => alert("Método de pago")}>
            <Text style={themeStyles.h4}>Modificar método de pago</Text>
          </Pressable>
          <Pressable onPress={() => alert("Suscripción")}>
            <Text style={themeStyles.h4}>Suscripción premium</Text>
          </Pressable>
          <Pressable onPress={() => alert("Historial")}>
            <Text style={themeStyles.h4}>Historial de compras</Text>
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
    marginBottom: 20,
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
