import { ScrollView, Text, StyleSheet } from "react-native";
import { useState } from "react";

import CustomButton from "../components/button.jsx";
import Popup from "../components/popup.jsx";

import color from "../config/colors.json";

export default function HomeStackNavigator() {
  const [alert, setAlert] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleStyle}>Home</Text>

      <CustomButton text="Mostrar alerta" onPress={() => setAlert(true)} />

      <Popup
        visible={alert}
        title="Alerta"
        message="Mi alerta personalizada"
        onClose={() => setAlert(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: color["app-background"],
    height: "100%",
  },

  titleStyle: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },

  list: {
    marginBottom: 30,
    gap: 20,
  },

  books: {
    flex: 1,
    width: 100,
    height: 150,
    resizeMode: "contain",
  },
});
