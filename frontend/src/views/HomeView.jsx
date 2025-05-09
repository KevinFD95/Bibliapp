import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BookLite from "../components/CardComponent.jsx";

import { viewStyles } from "../styles/globalStyles.js";
import { fetchAllDocuments } from "../controllers/documentController.js";
import RefreshableView from "../components/RefreshableViewComponent.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const [documents, setDocuments] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadDocuments(setDocuments, setError, setLoading);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={"large"} />
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

  if (!Array.isArray(documents)) {
    return (
      <View style={styles.centered}>
        <Text>No se encontraron documentos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={themeStyles.mainContainer}>
      <RefreshableView
        onRefresh={refreshView(
          loadDocuments,
          setDocuments,
          setError,
          setLoading,
        )}
      >
        <Text style={themeStyles.h1}>Novedades</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalSection}
        >
          {documents.map((item) => (
            <View key={item.document_id} style={styles.bookItem}>
              <BookLite
                key={item.document_id}
                title={item.title}
                image={item.url_image}
                onPress={() => handleBookPress(navigation, item)}
              />
            </View>
          ))}
        </ScrollView>
        <Text style={themeStyles.h2}>Recomendados para ti</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalSection}
        >
          {documents.map((item) => (
            <View key={`rec-${item.document_id}`} style={styles.bookItem}>
              <BookLite
                title={item.title}
                image={item.url_image}
                onPress={() => handleBookPress(navigation, item)}
              />
            </View>
          ))}
        </ScrollView>
      </RefreshableView>
    </View>
  );
}

function refreshView(loadDocuments, setDocuments, setError, setLoading) {
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await loadDocuments(setDocuments, setError, setLoading);
  };
}

async function loadDocuments(setDocuments, setError, setLoading) {
  try {
    const { success, data, error } = await fetchAllDocuments();

    if (success) {
      setDocuments(data);
    } else {
      setError(error);
    }
  } catch {
    setError("Error inesperado");
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
