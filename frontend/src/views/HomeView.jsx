import { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BookLite from "../components/CardComponent.jsx";
import CustomLoader from "../components/LoadingComponent.jsx";

import { viewStyles } from "../styles/globalStyles.js";
import {
  fetchAllDocuments,
  fetchRandomDocuments,
  fetchRandomDocumentsByCategories,
} from "../controllers/documentController.js";
import RefreshableView from "../components/RefreshableViewComponent.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const [newDocuments, setNewDocuments] = useState(null);
  const [randomDocuments, setRandomDocuments] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadHomeData(setNewDocuments, setRandomDocuments, setError, setLoading);
  }, []);

  if (loading) {
    return (
      <View style={[themeStyles.mainContainer, styles.centered]}>
        <CustomLoader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={themeStyles.mainContainer}>
      <RefreshableView
        onRefresh={refreshView(
          loadHomeData,
          setNewDocuments,
          setRandomDocuments,
          setError,
          setLoading,
        )}
      >
        <Text style={themeStyles.h1}>Novedades</Text>
        {newDocuments &&
        Array.isArray(newDocuments) &&
        newDocuments.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalSection}
          >
            {newDocuments.map((item) => (
              <View key={`new-${item.document_id}`} style={styles.bookItem}>
                <BookLite
                  title={item.title}
                  image={item.url_image}
                  onPress={() => handleBookPress(navigation, item)}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          !loading &&
          !error && (
            <Text style={themeStyles.text}>
              No hay novedades disponibles en este momento.
            </Text>
          )
        )}

        <Text style={themeStyles.h2}>Recomendados para ti</Text>
        {randomDocuments &&
        Array.isArray(randomDocuments) &&
        randomDocuments.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalSection}
          >
            {randomDocuments.map((item) => (
              <View key={`rec-${item.document_id}`} style={styles.bookItem}>
                <BookLite
                  title={item.title}
                  image={item.url_image}
                  onPress={() => handleBookPress(navigation, item)}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          !loading &&
          !error && (
            <Text style={themeStyles.text}>
              No hay recomendaciones disponibles en este momento.
            </Text>
          )
        )}
      </RefreshableView>
    </View>
  );
}

function refreshView(
  loadHomeData,
  setNewDocuments,
  setRandomDocuments,
  setError,
  setLoading,
) {
  return async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await loadHomeData(
      setNewDocuments,
      setRandomDocuments,
      setError,
      setLoading,
    );
    setLoading(false);
  };
}

async function loadHomeData(
  setNewDocuments,
  setRandomDocuments,
  setError,
  setLoading,
) {
  setLoading(true);
  setError(null);

  try {
    const newDocsPromise = fetchAllDocuments();
    const randomDocsByCategoryPromise = fetchRandomDocumentsByCategories();

    const [newDocsResult, randomDocsResult] = await Promise.all([
      newDocsPromise,
      randomDocsByCategoryPromise,
    ]);

    let hasError = false;
    let errorMessages = [];

    if (newDocsResult.success) {
      setNewDocuments(newDocsResult.data);
    } else {
      console.error("Error fetching new documents:", newDocsResult.error);
      setNewDocuments([]);
      hasError = true;
      errorMessages.push("Error al cargar las novedades");
    }

    if (randomDocsResult.success) {
      if (
        randomDocsResult.data &&
        Array.isArray(randomDocsResult.data) &&
        randomDocsResult.data.length > 0
      ) {
        setRandomDocuments(randomDocsResult.data);
      } else {
        const fallbackRandomResult = await fetchRandomDocuments();

        if (fallbackRandomResult.success) {
          setRandomDocuments(fallbackRandomResult.data || []);
        } else {
          console.error(
            "Error fetching fallback a documentos random:",
            fallbackRandomResult.error,
          );
          setRandomDocuments([]);
          hasError = true;
          errorMessages.push("Error al cargar recomendaciones generales");
        }
      }
    } else {
      console.error(randomDocsResult.error);
      setRandomDocuments([]);
      hasError = true;
      errorMessages.push("Error al cargar recomendaciones personalizadas");
    }

    if (hasError) {
      setError(errorMessages.join(" y "));
    }
  } catch (e) {
    console.error("Unexpected error in loadHomeData:", e);
    setError("Error inesperado al cargar los datos.");
  } finally {
    setLoading(false);
  }
}

function handleBookPress(navigation, document) {
  navigation.navigate("BookDetails", { document });
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    gap: 20,
    maxHeight: 250,
  },

  bookItem: {
    marginRight: 10,
  },

  centered: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
});
