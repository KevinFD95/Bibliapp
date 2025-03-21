import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function BookDetails({ route }) {
  const { bookId, bookTitle, bookSynopsis, bookImage } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bookTitle}</Text>
      <Image source={{ uri: bookImage }} style={styles.image} />
      <Text style={styles.content}>ID: {bookId}</Text>
      <Text style={styles.content}>{bookSynopsis}</Text>
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
  },
  content: {
    fontSize: 16,
    color: "#666",
  },
});
