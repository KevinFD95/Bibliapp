import { ScrollView, Text, StyleSheet } from "react-native";

export default function HomeStackNavigator() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleStyle}>Perfil</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 15,
    paddingLeft: 30,
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
