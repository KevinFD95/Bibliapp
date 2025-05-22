// React
import { useContext, useCallback, useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { useCart } from "../context/CartContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/detailsStyles.js";

// API
import { fetchIsRegistered } from "../controllers/registerController.js";
import { getDocumentDetails } from "../api/documents.js";

// Componentes
import { IconButton } from "../components/ButtonComponent.jsx";
import CustomLoader from "../components/LoadingComponent.jsx";
import BookLite from "../components/CardComponent.jsx";

// Iconos
import AddCartIcon from "../../assets/icons/AddCartIcon.jsx";

export default function BookDetails({ route, navigation }) {
  const { document } = route.params;

  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();
  const { addToCart } = useCart();

  const themeStyles = viewStyles(theme);

  const [isRegistered, setIsRegistered] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [prequelDocument, setPrequelDocument] = useState(null);
  const [sequelDocument, setSequelDocument] = useState(null);

  useEffect(() => {
    checkRegistrationStatus(document, setIsLoading, setIsRegistered, showAlert);
    fetchDocumentDetails(document.prequel, setPrequelDocument, showAlert);
    fetchDocumentDetails(document.sequel, setSequelDocument, showAlert);
  }, [document, showAlert]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        title: document.title,
      });
    }, [navigation, document]),
  );

  if (isLoading) {
    return (
      <View style={[themeStyles.mainContainer, styles.centered]}>
        <CustomLoader />
        <Text style={themeStyles.p}>Verificando estado del documento...</Text>
      </View>
    );
  }

  return (
    <View style={themeStyles.mainContainer}>
      <ScrollView>
        <View style={{ gap: 20 }}>
          <View style={styles.rowContainer}>
            <BookLite
              onPress={
                isRegistered
                  ? () => handleNavigation(navigation, document)
                  : undefined
              }
              title={isRegistered ? "Pulsa para leer" : "Compra para leer"}
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
                  onPress={() => handleAddToCart(document, addToCart)}
                  icon={<AddCartIcon size={30} />}
                />
              )}
            </View>
          </View>
          {document.saga && (
            <View>
              <Text style={themeStyles.p}>Saga: {document.saga}</Text>
            </View>
          )}
          <Text style={themeStyles.p}>{document.synopsis}</Text>
          <View style={styles.seriesContainer}>
            {prequelDocument && (
              <View style={styles.seriesItem}>
                <Text style={themeStyles.p}> {"<"}-- Precuela</Text>
                <BookLite
                  onPress={() =>
                    handleNavigateToBookDetails(navigation, prequelDocument)
                  }
                  title={prequelDocument.title}
                  image={prequelDocument.url_image}
                  cardStyle={styles.scaledBookLite}
                />
              </View>
            )}

            {sequelDocument && (
              <View style={styles.seriesItem}>
                <Text style={themeStyles.p}>Secuela --{">"} </Text>
                <BookLite
                  onPress={() =>
                    handleNavigateToBookDetails(navigation, sequelDocument)
                  }
                  title={sequelDocument.title}
                  image={sequelDocument.url_image}
                  cardStyle={styles.scaledBookLite}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

async function checkRegistrationStatus(
  document,
  setIsLoading,
  setIsRegistered,
  showAlert,
) {
  setIsLoading(true);

  if (document?.document_id) {
    const result = await fetchIsRegistered(document.document_id);
    if (result.success) {
      setIsRegistered(result.isRegistered);
    } else {
      showAlert({
        title: "Error",
        message: "Error verificando el registro del libro.",
      });
      setIsRegistered(false);
    }
    setIsLoading(false);
  } else {
    showAlert({ title: "Error", message: "Documento no disponible." });
    setIsRegistered(false);
    setIsLoading(false);
  }
}

async function handleAddToCart(document, addToCart) {
  addToCart(document);
}

function handleNavigation(navigation, document) {
  navigation.navigate("BookView", { document });
}

function handleNavigateToBookDetails(navigation, doc) {
  navigation.navigate("BookDetails", { document: doc });
}

async function fetchDocumentDetails(documentId, setDocumentState, showAlert) {
  if (!documentId) {
    setDocumentState(null);
    return;
  }
  try {
    const response = await getDocumentDetails(documentId);

    if (response.ok || response.status === 200) {
      if (response.data && response.data.document) {
        setDocumentState(response.data.document);
      } else {
        showAlert({
          title: "Error de formato",
          message:
            "Respuesta inesperada del servidor para el documento relacionado. No se encontró la clave 'document'.",
        });
        setDocumentState(null);
      }
    } else {
      showAlert({
        title: "Error al cargar documento",
        message: `No se pudo obtener la información del documento: ${response.message || "Error desconocido"}`,
      });
      setDocumentState(null);
    }
  } catch (error) {
    showAlert({
      title: "Error de conexión",
      message: `Hubo un problema al cargar el documento relacionado: ${error.message || "Verifica tu conexión y el servidor."}`,
    });
    setDocumentState(null);
  }
}
