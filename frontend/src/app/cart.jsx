import React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BookLite from "../components/card.jsx";

import viewStyles from "../styles/view-styles";
import { getCart } from "../api/documents.js";

function Cart() {
  const [books, setBooks] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getCart("fojeama");
        if (data && data.error) {
          setError(data.error);
        } else {
          setBooks(data || []);
        }
      } catch (err) {
        setError("Hubo un error al cargar los libros.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  if (!Array.isArray(books)) {
    return <Text>No se encontraron libros disponibles</Text>;
  }

  const handleBookPress = (document) => {
    navigation.navigate("BookDetails", { document });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        viewStyles.mainContainer,
        { justifyContent: "center" },
      ]}
    >
      <Text style={viewStyles.h1}>Novedades</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalSection}
      >
        {books.map((item) => (
          <View key={item.document_id} style={styles.bookItem}>
            <BookLite
              key={item.document_id}
              title={item.title}
              image={item.url_image}
              onPress={() => handleBookPress(item)}
            />
          </View>
        ))}
      </ScrollView>
      <Text style={viewStyles.h2}>Recomendados para ti</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalSection}
      >
        {books.map((item) => (
          <View key={`rec-${item.document_id}`} style={styles.bookItem}>
            <BookLite
              title={item.title}
              image={item.url_image}
              onPress={() => handleBookPress(item)}
            />
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e86de",
  },
  checkoutButton: {
    backgroundColor: "#2e86de",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Cart;
