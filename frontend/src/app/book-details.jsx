import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import BookLite from "../components/card.jsx";
import viewStyles from "../styles/view-styles.jsx";

export default function BookDetails({ route, navigation }) {
  const {
    bookId,
    bookTitle,
    bookSynopsis,
    bookImage,
    bookAutor,
    bookCategory,
    bookYear,
    bookPage,
    bookType,
  } = route.params;

  const handleNavigation = () => {
    navigation.navigate("BookView", { bookId });
  };

  return (
    <ScrollView style={viewStyles.mainContainer}>
      <Text style={styles.title}>{bookTitle}</Text>
      <View style={styles.rowContainer}>
        <BookLite
          style={styles.title}
          title="Pulsa para abrir"
          onPress={handleNavigation}
          image={bookImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.content}>Autor: {bookAutor}</Text>
          <Text style={styles.content}>Categoría: {bookCategory}</Text>
          <Text style={styles.content}>Páginas: {bookPage}</Text>
          <Text style={styles.content}>Año: {bookYear}</Text>
          <Text style={styles.content}>Tipo: {bookType}</Text>
        </View>
      </View>
      <Text style={styles.content}>{bookSynopsis}</Text>
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
  },
  content: {
    fontSize: 16,
    color: "#666",
    paddingBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 0,
    gap: 2,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 5,
  },
});
