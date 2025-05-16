// React
import { useState, useEffect, useContext, useCallback } from "react";
import { Text, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/searchStyles.js";

// API
import { getDocuments } from "../api/documents.js";

// Componentes
import BookLite from "../components/CardComponent.jsx";
import CustomLoader from "../components/LoadingComponent.jsx";
import { CustomTextBoxFind } from "../components/TextInputComponent.jsx";

export default function SearchView({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();

  const themeStyles = viewStyles(theme);

  const [searchText, setSearchText] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState();
  const [allDocuments, setAllDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleDocuments, setVisibleDocuments] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchBooks(setFilteredDocuments, setAllDocuments, showAlert, setLoading);
  }, [showAlert]);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Buscar" });
    }, [navigation]),
  );

  useEffect(() => {
    if (Array.isArray(filteredDocuments)) {
      const initialItems = filteredDocuments.slice(0, itemsPerPage);
      setVisibleDocuments(initialItems);
      setPage(1);
    }
  }, [filteredDocuments]);

  if (loading) {
    return (
      <View style={styles(theme).loadingScreen}>
        <CustomLoader />
      </View>
    );
  }

  if (!Array.isArray(filteredDocuments)) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={themeStyles.h5}>No se encontraron libros disponibles</Text>
      </View>
    );
  }

  const navigateToBookDetails = (document) => {
    navigation.navigate("BookDetails", { document });
  };

  return (
    <View style={themeStyles.mainContainer}>
      <FlatList
        data={visibleDocuments}
        keyExtractor={(item) => item.document_id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={() =>
          loadMore(
            page,
            itemsPerPage,
            filteredDocuments,
            setVisibleDocuments,
            setPage,
          )
        }
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <CustomTextBoxFind
            placeholder="Buscar"
            value={searchText}
            onChangeText={(text) => {
              handleSearch(
                text,
                allDocuments,
                setSearchText,
                setFilteredDocuments,
              );
            }}
          />
        }
        contentContainerStyle={styles(theme).elements}
        renderItem={({ item }) => (
          <View key={item.document_id} style={styles(theme).bookContainer}>
            <BookLite
              title="Pulsa para abrir"
              onPress={() => navigateToBookDetails(item)}
              image={item.url_image}
            />

            <View style={styles(theme).bookDescription}>
              <View style={styles(theme).itemLine}>
                <Text style={themeStyles.h5}>Título: </Text>
                <Text style={themeStyles.p}>{item.title}</Text>
              </View>
              <View style={styles(theme).itemLine}>
                <Text style={themeStyles.h5}>Categoría: </Text>
                <Text style={themeStyles.p}>
                  {item.category_1}
                  {item.category_2 && `, ${item.category_2}`}
                </Text>
              </View>
              <View style={styles(theme).itemLine}>
                <Text style={themeStyles.h5}>Autor: </Text>
                <Text style={themeStyles.p}>{item.author}</Text>
              </View>
              <View style={styles(theme).itemLine}>
                <Text style={themeStyles.h5}>Año: </Text>
                <Text style={themeStyles.p}>{item.publication_year}</Text>
              </View>
              <View style={styles(theme).itemLine}>
                <Text style={themeStyles.h5}>Tipo: </Text>
                <Text style={themeStyles.p}>{item.document_type}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

async function fetchBooks(
  setFilteredDocuments,
  setAllDocuments,
  showAlert,
  setLoading,
) {
  try {
    const response = await getDocuments();
    const { ok, status, data } = response;

    if (ok || status === 200) {
      setFilteredDocuments(data.documents);
      setAllDocuments(data.documents);
    }
  } catch {
    showAlert({
      title: "Error",
      message: "Hubo un error al cargar los documentos",
    });
  } finally {
    setLoading(false);
  }
}

function handleSearch(text, allDocuments, setSearchText, setFilteredDocuments) {
  setSearchText(text);

  const searchTerms = text.split(",").map((term) => term.trim().toLowerCase());

  const filtered = allDocuments.filter((doc) =>
    searchTerms.every((term) => {
      if (!term) return true;

      return (
        doc.title.toLowerCase().includes(term) ||
        doc.category_1.toLowerCase().includes(term) ||
        doc.category_2.toLowerCase().includes(term) ||
        doc.author.toLowerCase().includes(term) ||
        doc.publication_year.toString().includes(term) ||
        doc.document_type.toLowerCase().includes(term)
      );
    }),
  );

  setFilteredDocuments(filtered);
}

function loadMore(
  page,
  itemsPerPage,
  filteredDocuments,
  setVisibleDocuments,
  setPage,
) {
  const nextPage = page + 1;
  const nextItems = filteredDocuments.slice(
    page * itemsPerPage,
    nextPage * itemsPerPage,
  );

  setVisibleDocuments((prevItems) => {
    const newItems = nextItems.filter(
      (item) =>
        !prevItems.some(
          (existing) => existing.document_id === item.document_id,
        ),
    );
    return [...prevItems, ...newItems];
  });

  setPage(nextPage);
}
