import { useState } from "react";
import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import BookLite from "../components/card.jsx";
import viewStyles from "../styles/view-styles.jsx";
import { IconButton } from "../components/button.jsx";
import { Popup } from "../components/popup.jsx";
import AddCartIcon from "../../assets/icons/add-cart-icon.jsx";
import { customFetch } from "../api";

export default function BookDetails({ route, navigation }) {
  const { document } = route.params;
  const [alertVisible, setAlertVisible] = useState(false);

  const handleAddToCart = async () => {
    try {
      const username = "franusaurio";
      const response = await customFetch(`/cart/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ document_id: document.document_id }),
      });

      console.log("Respuesta de customFetch:", response);

      if (response) {
        setAlertVisible(true);
      } else {
        console.error("Error al añadir al carrito");
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  const handleNavigation = () => {
    navigation.navigate("BookView", { document });
  };

  return (
    <ScrollView contentContainerStyle={viewStyles.mainContainer}>
      <View style={{ gap: 20 }}>
        <Text style={styles.title}>{document.title}</Text>
        <View style={styles.rowContainer}>
          <BookLite
            style={styles.title}
            title="Pulsa para abrir"
            onPress={handleNavigation}
            image={document.url_image}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.content}>Autor: {document.author}</Text>
            <Text style={styles.content}>Categoría: {document.category}</Text>
            <Text style={styles.content}>Páginas: {document.num_pages}</Text>
            <Text style={styles.content}>Año: {document.publication_year}</Text>
            <Text style={styles.content}>Tipo: {document.document_type}</Text>
            <Text style={[styles.content, { paddingBottom: 30 }]}>
              Precio: {document.price}€
            </Text>
            <IconButton
              onPress={handleAddToCart}
              icon={<AddCartIcon size={30} />}
            />
          </View>
        </View>
        <Text style={styles.synopsisContent}>{document.synopsis}</Text>
        <Popup
          title={"Añadir Libro"}
          message={"Añadido al Carrito"}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        />
      </View>
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
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    color: "#666",
    paddingBottom: 5,
  },
  synopsisContent: {
    fontSize: 16,
    color: "#666",
    paddingBottom: 35,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 5,
    paddingLeft: 20,
  },
});
