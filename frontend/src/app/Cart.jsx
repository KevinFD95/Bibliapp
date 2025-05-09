import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { BookLiteCart } from "../components/CardComponent.jsx";
import { CustomButton } from "../components/ButtonComponent.jsx";
import { viewStyles } from "../styles/globalStyles.js";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useCart } from "../context/CartContext.jsx";

import { useAlert } from "../context/AlertContext.jsx";

export default function Cart() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const { cartItems, removeFromCart, purchaseItems, isLoading } = useCart();
  const { showConfirm } = useAlert();

  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      if (cartItems && Array.isArray(cartItems)) {
        cartItems.forEach((book) => {
          const price = parseFloat(book.price);
          if (!isNaN(price)) {
            total += price;
          }
        });
      }
      setTotalPrice(total.toFixed(2));
    };

    calculateTotal();
  }, [cartItems]);

  const handleRemoveBook = async (document) => {
    await removeFromCart(document);
  };

  const handlePurchase = async () => {
    await purchaseItems();
  };

  if (isLoading) {
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

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
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
          {cartItems.map((item) => (
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
      {cartItems && cartItems.length > 0 && (
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
                showConfirm({
                  title: "Aviso",
                  message: "Desea comprar todos los documentos del carrito?",
                  onConfirm: handlePurchase,
                });
              }}
            />
          </View>
        </View>
      )}
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
