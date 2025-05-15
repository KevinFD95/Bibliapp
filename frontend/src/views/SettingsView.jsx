// React
import { useCallback, useContext } from "react";
import { Text, View, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/settingsStyles.js";

// Temas
import LightModeIcon from "../../assets/icons/LightModeIcon.jsx";
import DarkModeIcon from "../../assets/icons/DarkModeIcon.jsx";

// Componentes
import CustomSwitch from "../components/SwitchComponent.jsx";
import { IconButton } from "../components/ButtonComponent.jsx";

export default function HomeStackNavigator({ navigation }) {
  const { theme, mode, toggleTheme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const lightmode = mode === "light";
  const darkmode = mode === "dark";

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Configuración" });
    }, [navigation]),
  );

  return (
    <View style={[themeStyles.mainContainer]}>
      <View style={styles.row}>
        <Text style={themeStyles.h3}>Tema</Text>
        <View style={styles.icons}>
          <IconButton
            onPress={() => {
              if (!lightmode) toggleTheme("light");
            }}
            icon={<LightModeIcon size={48} filled={lightmode} />}
          />
          <IconButton
            onPress={() => {
              if (!darkmode) toggleTheme("dark");
            }}
            icon={<DarkModeIcon size={48} filled={darkmode} />}
          />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={themeStyles.h3}>Notificaciones</Text>
          <CustomSwitch onValueChange={() => alert("Cambio de switch")} />
        </View>
        <View style={styles.row}>
          <Text style={themeStyles.h3}>Recordatorio de lectura</Text>
          <CustomSwitch onValueChange={() => alert("Cambio de switch")} />
        </View>
        <View style={styles.row}>
          <Text style={themeStyles.h3}>Recomendaciones de libros</Text>
          <CustomSwitch onValueChange={() => alert("Cambio de switch")} />
        </View>
        <View style={styles.linkContainer}>
          <Pressable onPress={() => alert("Método de pago")}>
            <Text style={themeStyles.h3}>Modificar método de pago</Text>
          </Pressable>
          <Pressable onPress={() => alert("Suscripción")}>
            <Text style={themeStyles.h3}>Suscripción premium</Text>
          </Pressable>
          <Pressable onPress={() => alert("Historial")}>
            <Text style={themeStyles.h3}>Historial de compras</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
