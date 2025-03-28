import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function BookView({ route }) {
  const { bookId } = route.params;
  const bookUrl =
    "https://www.mercaba.org/SANLUIS/ALiteratura/Literatura%20contempor%C3%A1nea/Tolkien%20J.%20R.%20R/El%20se%C3%B1or%20de%20los%20anillos%203%20El%20retorno%20del%20Rey.pdf";

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Lectura de Libro</Text>
      <Text>{bookId}</Text>

      <WebView source={{ uri: bookUrl }} style={{ flex: 1 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    color: "#666",
    textAlign: "justify",
  },
});
