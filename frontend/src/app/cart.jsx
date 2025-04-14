import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import viewStyles from "../styles/view-styles";

function Cart() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[viewStyles.mainContainer, styles.container]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mi Carrito</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.priceText}>$0.00</Text>
          </View>
        </View>
      </ScrollView>
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
