import { useContext, useState } from "react";
import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import BookLite from "../components/Card.jsx";
import { viewStyles } from "../styles/GlobalStyles.js";
import { IconButton } from "../components/Button.jsx";
import { Popup } from "../components/Popup.jsx";
import AddCartIcon from "../../assets/icons/AddCartIcon.jsx";
import { getCartDoc, addCart } from "../api/Cart.js";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function BookDetails({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const { document } = route.params;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertTitle, setAlertTitle] = useState();

  const handleAddToCart = async () => {
    try {
      const check = await getCartDoc(document.document_id);
      const { ok, status } = check;
      if (ok && status === 200) {
        setAlertMessage(`${document.title} ya está añadido en el carrito`);
        setAlertTitle("Añadir Documento");
        setAlertVisible(true);
        return;
      } else if (status === 404) {
        const response = await addCart(document.document_id);
        const { ok, status } = response;

        if (ok && status === 200) {
          setAlertMessage(`${document.title} se ha añadido al carrito`);
          setAlertTitle("Añadir Documento");
          setAlertVisible(true);
        } else {
          setAlertMessage("No se ha podido añadir al carrito");
          setAlertTitle("Añadir Documento");
          setAlertVisible(true);
        }
      } else {
        setAlertMessage("Error al añadir al carrito");
        setAlertTitle("Aviso");
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  const handleNavigation = () => {
    navigation.navigate("BookView", { document });
  };

  return (
    <View style={themeStyles.mainContainer}>
      <ScrollView>
        <View style={{ gap: 20 }}>
          <Text style={[themeStyles.h1, { textAlign: "center" }]}>
            {document.title}
          </Text>
          <View style={styles.rowContainer}>
            <BookLite
              style={styles.title}
              title="Pulsa para abrir"
              onPress={handleNavigation}
              image={document.url_image}
            />
            <View style={styles.detailsContainer}>
              <Text style={themeStyles.p}>Autor: {document.author}</Text>
              <Text style={themeStyles.p}>Categoría: {document.category}</Text>
              <Text style={themeStyles.p}>Páginas: {document.num_pages}</Text>
              <Text style={themeStyles.p}>
                Año: {document.publication_year}
              </Text>
              <Text style={themeStyles.p}>Tipo: {document.document_type}</Text>
              <Text style={themeStyles.p}>Precio: {document.price}€</Text>
              <IconButton
                onPress={handleAddToCart}
                icon={<AddCartIcon size={30} />}
              />
            </View>
          </View>
          <Text style={themeStyles.p}>{document.synopsis}</Text>
          <Popup
            title={alertTitle}
            message={alertMessage}
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </ScrollView>
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
    gap: 10,
  },
});
