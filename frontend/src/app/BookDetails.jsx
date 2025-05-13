import { useContext, useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import BookLite from "../components/CardComponent.jsx";
import { viewStyles } from "../styles/globalStyles.js";
import { IconButton } from "../components/ButtonComponent.jsx";
import AddCartIcon from "../../assets/icons/AddCartIcon.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { fetchIsRegistered } from "../controllers/registerController.js";

export default function BookDetails({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const { addToCart } = useCart();

  const { document } = route.params;

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        title: document.title,
      });
    }, [navigation, document]),
  );

  const [isRegistered, setIsRegistered] = useState(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      setIsLoadingStatus(true);

      if (document?.document_id) {
        const result = await fetchIsRegistered(document.document_id);
        if (result.success) {
          setIsRegistered(result.isRegistered);
        } else {
          console.error(
            "BookDetails: Error verificando estado de registro:",
            result.error,
          );
          setIsRegistered(false);
        }
        setIsLoadingStatus(false);
      } else {
        console.warn(
          "BookDetails: document o document_id no disponible en route.params",
        );
        setIsRegistered(false);
        setIsLoadingStatus(false);
      }
    };

    checkRegistrationStatus();
  }, [document?.document_id]);

  const handleAddToCart = async () => {
    addToCart(document);
  };

  const handleNavigation = () => {
    navigation.navigate("BookView", { document });
  };

  if (isLoadingStatus) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={themeStyles.text?.color} />
        <Text style={themeStyles.text}>
          Verificando estado del documento...
        </Text>
      </View>
    );
  }

  return (
    <View style={themeStyles.mainContainer}>
      <ScrollView>
        <View style={{ gap: 20 }}>
          <View style={styles.rowContainer}>
            <BookLite
              onPress={isRegistered ? handleNavigation : undefined}
              title={isRegistered ? "Pulsa para abrir" : "Cómpralo para leer"}
              image={document.url_image}
            />
            <View style={styles.detailsContainer}>
              <Text style={themeStyles.p}>Autor: {document.author}</Text>
              <Text style={themeStyles.p}>
                Categoría: {document.category_1}
                {document.category_2 && `, ${document.category_2}`}
              </Text>
              <Text style={themeStyles.p}>Páginas: {document.num_pages}</Text>
              <Text style={themeStyles.p}>
                Año: {document.publication_year}
              </Text>
              <Text style={themeStyles.p}>Tipo: {document.document_type}</Text>
              {!isRegistered && (
                <Text style={themeStyles.p}>Precio: {document.price}€</Text>
              )}
              {!isRegistered && (
                <IconButton
                  onPress={handleAddToCart}
                  icon={<AddCartIcon size={30} />}
                />
              )}
            </View>
          </View>
          <Text style={themeStyles.p}>{document.synopsis}</Text>
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
    flex: 1,
  },
  centered: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: themeStyles.mainContainer.backgroundColor,
  },
});
