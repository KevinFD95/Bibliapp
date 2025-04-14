import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BookDetails from "./book-details.jsx";
import BookView from "./book-view.jsx";

import BookLite from "../components/card.jsx";

import viewStyles from "../styles/view-styles.jsx";
import { getDocuments } from "../api/documents.js";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="HomeView"
        component={HomeScreen}
        options={{ unmountOnBlur: true }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{ unmountOnBlur: true }}
      />
      <Stack.Screen
        name="BookView"
        component={BookView}
        options={{ unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const [books, setBooks] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getDocuments();
        setBooks(data);
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
  if (!Array.isArray(books)) {
    return <Text>No se encontraron libros disponibles</Text>;
  }

  const handleBookPress = (document) => {
    navigation.navigate("BookDetails", { document });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        viewStyles.mainContainer,
        { justifyContent: "center" },
      ]}
    >
      <Text style={viewStyles.h1}>Novedades</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalSection}
      >
        {books.map((item) => (
          <View key={item.document_id} style={styles.bookItem}>
            <BookLite
              key={item.document_id}
              title={item.title}
              image={item.url_image}
              onPress={() => handleBookPress(item)}
            />
          </View>
        ))}
      </ScrollView>
      <Text style={viewStyles.h2}>Recomendados para ti</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalSection}
      >
        {books.map((item) => (
          <View key={`rec-${item.document_id}`} style={styles.bookItem}>
            <BookLite
              title={item.title}
              image={item.url_image}
              onPress={() => handleBookPress(item)}
            />
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
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
});
