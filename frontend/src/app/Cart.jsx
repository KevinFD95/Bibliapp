import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { BookLiteCart } from "../components/CardComponent.jsx";
import { CustomButton } from "../components/ButtonComponent.jsx";
import { viewStyles } from "../styles/globalStyles.js";
import { getCart, deleteCart, finalizePurchaseApi } from "../api/cart.js";
import { ConfirmPopup } from "../components/PopupComponent.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { AlertContext } from "../context/AlertContext.jsx";

function Cart() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const { showAlert } = useContext(AlertContext);

  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      const { ok, status, data } = response;
      if (!ok && status === 404) {
        setBooks([]);
        setError(null);
      } else if (ok && status === 200) {
        setBooks(data.cart);
        setError(null);
      } else {
        const errorMessage =
          response?.error?.message ||
          response?.error ||
          "Hubo un error al cargar los libros.";
        setError(errorMessage);
      }
    } catch (err) {
      setError("Hubo un error al cargar los libros.");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
      return () => {
        setBooks([]);
        setError(null);
      };
    }, []),
  );

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

  const handleRemoveBook = async (document) => {
    try {
      setLoading(true);
      const response = await deleteCart(document.document_id);
      const { ok, status } = response;
      if (ok && status === 200) {
        await fetchBooks();
        showAlert(
          "Eliminar Documento",
          `${document.title} se ha eliminado del carrito`,
        );
      } else {
        const errorMessage =
          response?.error?.message ||
          response?.error ||
          `Error: ${document.title} no se ha podido eliminar del carrito`;
        showAlert("Eliminar Documento", errorMessage);
      }
    } catch (err) {
      showAlert(
        "Error de Comunicación",
        "Hubo un error al comunicarse con el servidor para eliminar el libro.",
      );
      console.error("Error de red al eliminar el libro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const purchaseResponse = await finalizePurchaseApi();
      if (purchaseResponse && purchaseResponse.ok) {
        setBooks([]);
        showAlert(
          "Compra Finalizada",
          "Se ha/han comprado el/los documento/s del carrito",
        );
      } else {
        const errorData = purchaseResponse?.error;
        showAlert(
          "Error de Compra",
          errorData || "Hubo un error al realizar la compra.",
        );
      }
    } catch (error) {
      showAlert(
        "Error de Comunicación",
        "Hubo un error al comunicarse con el servidor para realizar la compra.",
      );
      console.error("Error de red en la compra:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          themeStyles.mainContainer,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error && (!books || books.length === 0)) {
    return (
      <View
        style={[
          themeStyles.mainContainer,
          { flex: 1, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>{error}</Text>
      </View>
    );
  }

  if (!Array.isArray(books) || books.length === 0) {
    return (
      <View style={[themeStyles.mainContainer, styles.emptyContainer]}>
        <Text style={themeStyles.p}>El carrito está vacío.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={[themeStyles.mainContainer, { flex: 1 }]}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: styles.footer.height,
          }}
        >
          {books.map((item) => (
            <View key={item.document_id} style={styles.bookItem}>
              <View style={styles.bookRow}>
                <BookLiteCart image={item.url_image} />
                <View style={styles.bookDetails}>
                  <View style={styles.removeIconContainer}>
                    <TouchableOpacity onPress={() => handleRemoveBook(item)}>
                      <Text style={styles.removeIcon}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.bookAuthor}>Autor: {item.author}</Text>
                  {item.updated_at && (
                    <Text style={styles.bookDate}>
                      Añadido:
                      {new Date(item.updated_at).toLocaleDateString()}
                    </Text>
                  )}
                  <Text style={styles.bookPrice}>{item.price}€</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {books && books.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalText}>Total: </Text>
              <Text style={styles.priceText}>{totalPrice}€</Text>
            </View>
            <CustomButton
              title="Comprar"
              text={"Realizar compra"}
              onPress={() => {
                setConfirmVisible(true);
              }}
            />
          </View>
        </View>
      )}
      <ConfirmPopup
        title={"Confirmación de compra"}
        message={"¿Desea realmente realizar la compra?"}
        visible={confirmVisible}
        onConfirm={() => {
          handlePurchase();
          setConfirmVisible(false);
        }}
        onClose={() => {
          setConfirmVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 15,
    width: "100%",
    height: 140,
  },
  totalContainer: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
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
