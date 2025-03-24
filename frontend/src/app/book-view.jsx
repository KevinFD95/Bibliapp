import { ScrollView, Text, StyleSheet } from "react-native";

export default function BookView({ route }) {
  const { bookId } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleStyle}>Lectura de Libro</Text>
      <Text>{bookId}</Text>
    </ScrollView>
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
