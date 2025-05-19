// React
import { useState, useEffect, useContext, useCallback } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/homeStyles.js";

// API
import {
  fetchAllNews,
  fetchRandomDocuments,
  fetchRandomDocumentsByCategories,
} from "../controllers/documentController.js";

// Components
import RefreshableView from "../components/RefreshableViewComponent.jsx";
import CustomLoader from "../components/LoadingComponent.jsx";
import BookLite from "../components/CardComponent.jsx";

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

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        title: "Bibliapp",
      });
    }, [navigation]),
  );

  if (loading) {
    return (
      <View style={[themeStyles.mainContainer, styles.centered]}>
        <CustomLoader />
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
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ flexGrow: 1, height: "50%" }}>
            <Text style={themeStyles.h1}>Novedades</Text>
            {newDocuments &&
            Array.isArray(newDocuments) &&
            newDocuments.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
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
              error && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[themeStyles.h4, { textAlign: "center" }]}>
                    No hay novedades disponibles en este momento.
                  </Text>
                </View>
              )
            )}
          </View>

          <View style={{ flexGrow: 1, height: "50%" }}>
            <Text style={themeStyles.h2}>Recomendados para ti</Text>
            {randomDocuments &&
            Array.isArray(randomDocuments) &&
            randomDocuments.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
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
              error && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[themeStyles.h4, { textAlign: "center" }]}>
                    No hay recomendaciones disponibles en este momento.
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
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
    const newDocsPromise = fetchAllNews();
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
          setRandomDocuments([]);
          hasError = true;
          errorMessages.push("Error al cargar recomendaciones generales");
        }
      }
    } else {
      setRandomDocuments([]);
      hasError = true;
      errorMessages.push("Error al cargar recomendaciones personalizadas");
    }

    if (hasError) {
      setError(errorMessages.join(" y "));
    }
  } catch {
    setError("Error inesperado al cargar los datos.");
  } finally {
    setLoading(false);
  }
}

function handleBookPress(navigation, document) {
  navigation.navigate("BookDetails", { document });
}
