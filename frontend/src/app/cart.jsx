import React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BookLiteCart } from "../components/card.jsx";
import { CustomButton } from "../components/button.jsx";
import viewStyles from "../styles/view-styles";
import { getCart, deleteCart, buyDocCart } from "../api/cart.js";
import { Popup } from "../components/popup.jsx";

function Cart() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const navigation = useNavigation();
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [deletedBookTitle, setDeletedBookTitle] = useState("");
  const [purchaseAlertVisible, setPurchaseAlertVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchBooks = async () => {
        try {
          //const username = "franusaurio";

          const response = await getCart();
          const { ok, status, data } = response;
          if (!ok && status === 404) {
            setError(response.error);
          } else {
            setBooks(data.cart);
          }
        } catch (err) {
          setError("Hubo un error al cargar los libros.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      if (books && Array.isArray(books)) {
        books.forEach((book) => {
          const price = parseFloat(book.price);
          if (!isNaN(price)) {
            total += price;
          }
        });
      }
      setTotalPrice(total.toFixed(2));
    };

    calculateTotal();
  }, [books]);

  const handleBookPress = (document) => {
    navigation.navigate("BookDetails", { document });
  };

  const handleRemoveBook = async (documentId, bookTitle) => {
    try {
      setLoading(true);

      const username = "franusaurio";
      const response = await deleteCart(username, documentId);

      if (response && response.ok) {
        const updatedBooks = books.filter(
          (book) => book.document_id !== documentId,
        );
        setBooks(updatedBooks);
        setDeletedBookTitle(bookTitle);
        setDeleteAlertVisible(true);
      } else {
        setError("Hubo un error al eliminar el libro del carrito.");
        console.error("Error al eliminar el libro:", response);
      }
    } catch (err) {
      setError(
        "Hubo un error al comunicarse con el servidor para eliminar el libro.",
      );
      console.error("Error al eliminar el libro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const username = "";
      const purchaseResponse = await buyDocCart(username);

      if (purchaseResponse && purchaseResponse.ok) {
        setBooks([]);
        setPurchaseAlertVisible(true);
      } else {
        const errorData = await purchaseResponse.json();
        setError(errorData?.message || "Hubo un error al realizar la compra.");
        console.error("Error al realizar la compra:", purchaseResponse);
      }
    } catch (error) {
      setError(
        "Hubo un error al comunicarse con el servidor para realizar la compra.",
      );
      console.error("Error al realizar la compra:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          viewStyles.mainContainer,
          { justifyContent: "flex-start", paddingBottom: styles.footer.height },
        ]}
      >
        {books.map((item) => (
          <View key={item.document_id} style={styles.bookItem}>
            <View style={styles.bookRow}>
              <BookLiteCart
                key={item.document_id}
                image={item.url_image}
                onPress={() => handleBookPress(item)}
              />
              <View style={styles.bookDetails}>
                <View style={styles.removeIconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleRemoveBook(item.document_id, item.title)
                    }
                  >
                    <Text style={styles.removeIcon}>X</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>Autor: {item.author}</Text>
                <Text style={styles.bookDate}>
                  Modificado: {new Date(item.updated_at).toLocaleDateString()}
                </Text>
                <Text style={styles.bookPrice}>{item.price}€</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalText}>Total: </Text>
            <Text style={styles.priceText}>{totalPrice}€</Text>
          </View>
          <CustomButton
            title="Comprar"
            text={"Realizar compra"}
            onPress={handlePurchase}
          />
        </View>
      </View>
      <Popup
        title={"Libro Eliminado"}
        message={`'${deletedBookTitle}' ha sido eliminado del carrito.`}
        visible={deleteAlertVisible}
        onClose={() => setDeleteAlertVisible(false)}
      />
      <Popup
        title={"Compra Realizada"}
        message={"Su compra se ha realizado con éxito."}
        visible={purchaseAlertVisible}
        onClose={() => setPurchaseAlertVisible(false)}
      />
    </View>
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
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 15,
  },
  totalContainer: {
    flexDirection: "column",
    alignItems: "space-between",
  },
  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e86de",
    paddingRight: 20,
  },
  bookItem: {
    marginBottom: 15,
    paddingHorizontal: 20,
    width: "100%",
  },
  bookRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  bookDetails: {
    flex: 1,
    paddingLeft: 15,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: "gray",
    marginBottom: 3,
  },
  bookDate: {
    fontSize: 12,
    color: "lightgray",
    marginBottom: 5,
  },
  bookPrice: {
    fontSize: 16,
    color: "#2e86de",
    marginTop: 10,
  },
  removeIconContainer: {
    alignItems: "flex-end",
  },
  removeIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    padding: 5,
  },
  removeIconImage: {
    width: 20,
    height: 20,
  },
});

export default Cart;
