import { ScrollView, Text } from "react-native";
import { useState } from "react";

import CustomButton from "../components/button.jsx";
import Popup from "../components/popup.jsx";

import viewStyles from "../styles/view-styles.jsx";

export default function HomeStackNavigator() {
  const [alert, setAlert] = useState(false);

  return (
    <ScrollView contentContainerStyle={viewStyles.mainContainer}>
      <Text style={viewStyles.mainTitle}>Título de prueba</Text>
      <Text style={viewStyles.text}>Texto de prueba</Text>

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
