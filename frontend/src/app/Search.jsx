import { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { getDocuments } from "../api/documents.js";
import { viewStyles } from "../styles/globalStyles.js";
import BookDetails from "./BookDetails.jsx";
import BookView from "./BookView.jsx";
import BookLite from "../components/CardComponent.jsx";
import { CustomTextBoxFind } from "../components/TextInputComponent.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Stack = createStackNavigator();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SearchView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SearchView" component={SearchView} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      <Stack.Screen name="BookView" component={BookView} />
    </Stack.Navigator>
  );
}

function SearchView({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);

  const [searchText, setSearchText] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState();
  const [allDocuments, setAllDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getDocuments();
        const { ok, status, data } = response;

        if (ok || status === 200) {
          setFilteredDocuments(data.documents);
          setAllDocuments(data.documents);
        }
      } catch (err) {
        setError("Hubo un error al cargar los libros.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  if (!Array.isArray(filteredDocuments)) {
    return <Text>No se encontraron libros disponibles</Text>;
  }

  const handleSearch = (text) => {
    setSearchText(text);

    const searchTerms = text
      .split(",")
      .map((term) => term.trim().toLowerCase());

    const filtered = allDocuments.filter((doc) =>
      searchTerms.every((term) => {
        if (!term) return true;

        return (
          doc.title.toLowerCase().includes(term) ||
          // documents.category.toLowerCase().includes(term) ||
          doc.author.toLowerCase().includes(term) ||
          doc.publication_year.toString().includes(term) ||
          doc.document_type.toLowerCase().includes(term)
        );
      }),
    );

    setFilteredDocuments(filtered);
  };

  const navigateToBookDetails = (document) => {
    navigation.navigate("BookDetails", { document });
  };

  return (
    <View style={themeStyles.mainContainer}>
      <ScrollView>
        <CustomTextBoxFind
          placeholder="Buscar"
          value={searchText}
          onChangeText={handleSearch}
        />
        <View style={styles.elements}>
          {filteredDocuments.map((item) => (
            <View key={item.document_id} style={styles.bookContainer}>
              <BookLite
                title="Pulsa para abrir"
                onPress={() => navigateToBookDetails(item)}
                image={item.url_image}
              />
              <View style={styles.bookDescription}>
                <View style={styles.itemLine}>
                  <Text style={themeStyles.h5}>Título: </Text>
                  <Text style={themeStyles.p}>{item.title}</Text>
                </View>
                <View style={styles.itemLine}>
                  <Text style={themeStyles.h5}>Categoría: </Text>
                  <Text style={themeStyles.p}>{item.category}</Text>
                </View>
                <View style={styles.itemLine}>
                  <Text style={themeStyles.h5}>Autor: </Text>
                  <Text style={themeStyles.p}>{item.author}</Text>
                </View>
                <View style={styles.itemLine}>
                  <Text style={themeStyles.h5}>Año: </Text>
                  <Text style={themeStyles.p}>{item.publication_year}</Text>
                </View>
                <View style={styles.itemLine}>
                  <Text style={themeStyles.h5}>Tipo: </Text>
                  <Text style={themeStyles.p}>{item.document_type}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  elements: {
    width: "100%",
    gap: 20,
  },

  bookContainer: {
    width: "100%",
    gap: 10,
    flexDirection: "row",
  },

  bookDescription: {
    width: "80%",
    paddingVertical: 10,
    flexShrink: 1,
    gap: 10,
  },

  itemLine: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
