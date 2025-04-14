import { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import viewStyle from "../styles/view-styles.jsx";
import SwitchComponent from "../components/switch.jsx";

export default function SettingsScreen() {
  const [switchState, setSwitchState] = useState(false);

  const handleSwitchChange = () => {
    setSwitchState(switchState);
  };

  return (
    <ScrollView contentContainerStyle={viewStyle.mainContainer}>
      <View style={styles.row}>
        <Text>Tema</Text>
        <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/714/986/png-clipart-art-graphy-icon-sun-photography-sunlight.png",
          }}
          style={[styles.image, { marginLeft: 200 }]} // Añadimos un margen derecho
        />
        <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/1018/540/png-clipart-computer-icons-symbol-star-and-crescent-symbol-miscellaneous-leaf.png",
          }}
          style={[styles.image, { marginLeft: 5 }]} // Estilo con margen
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>Notificaciones</Text>
        <SwitchComponent onChange={handleSwitchChange} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Recordatorio de lectura</Text>
        <SwitchComponent onChange={handleSwitchChange} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Recomendaciones de libros</Text>
        <SwitchComponent onChange={handleSwitchChange} />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Modificar metodo de pago</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Suscripcion premium</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Historial de pagos</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 15, // Esto agrega un margen entre las imágenes
  },
  text: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row", // Esto hace que los elementos estén alineados en una fila
    alignItems: "center", // Alinea verticalmente los elementos
    marginBottom: 20, // Opcional: puedes agregar un poco de espacio entre filas
  },
});
