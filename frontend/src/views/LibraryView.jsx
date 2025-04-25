import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAllRegisters } from "../api/registers.js";

import BookLite from "../components/CardComponent.jsx";
import { Popup } from "../components/PopupComponent.jsx";

import { viewStyles } from "../styles/globalStyles.js";
import { ThemeContext } from "../context/ThemeContext.jsx";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";
import RefreshableView from "../components/RefreshableViewComponent.jsx";

export default function Library() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const navigation = useNavigation();

  const [alert, setAlert] = useState(false);
  const [error, setError] = useState();
  const [documents, setDocuments] = useState();
  const [loading, setLoading] = useState(false);

  const onRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await loadDocuments(setDocuments, setError, setLoading);
  };

  useEffect(() => {
    loadDocuments(setDocuments, setLoading, setError);
  }, []);

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

  if (!Array.isArray(documents)) {
    return (
      <View
        style={[
          themeStyles.mainContainer,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text style={[themeStyles.h3, { marginBottom: 30 }]}>
          No tienes libros en tu biblioteca.
        </Text>
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={[themeStyles.p, { textAlign: "center" }]}>
            Descubre los libros disponibles en la tienda en la sección de
            Búsqueda.
          </Text>
          <SearchIcon size={42} />
        </View>
      </View>
    );
  }

  return (
    <View style={themeStyles.mainContainer}>
      <RefreshableView onRefresh={onRefresh}>
        <ScrollView contentContainerStyle={styles.vistaTarjeta}>
          {documents.map((item) => (
            <BookLite
              key={item.document_id}
              title={item.title}
              image={item.url_image}
              onPress={() => handleNavigation(navigation, item)}
            />
          ))}
        </ScrollView>
      </RefreshableView>

      <Popup message={error} onClose={() => setAlert(false)} visible={alert} />
    </View>
  );
}

async function loadDocuments(setDocuments, setError, setLoading) {
  try {
    const response = await getAllRegisters();
    const { ok, status, data, errors } = response;

    if (ok && status === 200) {
      setDocuments(data.documents);
    } else {
      setError(errors);
    }
  } catch {
    setError("Error inesperado");
  } finally {
    setLoading(false);
  }
}

function handleNavigation(navigation, document) {
  navigation.navigate("BookDetails", { document });
}

const styles = StyleSheet.create({
  vistaTarjeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 30,
  },
});
