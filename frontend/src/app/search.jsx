import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import viewStyles from "../styles/view-styles.jsx";
import BookDetails from "./book-details.jsx";
import BookView from "./book-view.jsx";
import BookLite from "../components/card.jsx";
import { CustomTextBoxFind } from "../components/text-input.jsx";

const Stack = createStackNavigator();

const book = [
  {
    document_id: "1",
    title: "El Señor de los Anillos",
    url_image:
      "https://www.planetadelibros.com/usuaris/libros/fotos/357/original/portada_el-senor-de-los-anillos-1-la-comunidad-del-anillo_j-r-r-tolkien_202207271304.jpg",
    synopsis:
      "En la Tierra Media, el Señor Oscuro Sauron forjó los Grandes Anillos del Poder y creó uno con el poder de esclavizar a toda la Tierra Media. Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único con la misión de destruirlo. Acompañado de sus amigos, Frodo emprende un viaje hacia Mordor, el único lugar donde el anillo puede ser destruido. Sin embargo, Sauron ordena la persecución del grupo para recuperar el anillo y acabar con la Tierra Media.",
    category: "Fantasía",
    autor: "J.R.R. Tolkien",
    year: 1954,
    pages: 576,
    type: "Libro",
    price: 7.99,
  },
  {
    document_id: "2",
    title: "El Psicoanalista",
    url_image: "https://m.media-amazon.com/images/I/814DrJ8lFlL.jpg",
    synopsis:
      "El día de su 53 cumpleaños, el doctor Starks, un psicoanalista con una larga carrera a sus espaldas, recibe un misterioso e inquietante anónimo. Starks tendrá que emplear toda su astucia para, en quince días, averiguar quién es el autor de la misiva. De no conseguirlo, deberá elegir entre suicidarse o ser testigo de cómo, uno tras otro, sus familiares y amigos van siendo asesinados por un psicópata que promete llevar hasta el fin su venganza. John Katzenbach alcanzó la popularidad con la publicación de El psicoanalista, un thriller inmejorable en el que explora con maestría las mentes desviadas.",
    category: "Suspense",
    autor: "John Katzenbach",
    year: 2003,
    pages: 464,
    type: "Libro",
    price: 5.99,
  },
  {
    document_id: "3",
    title: "El Código da Vinci",
    url_image:
      "https://m.media-amazon.com/images/I/71PR0C4XNjL._AC_UF1000,1000_QL80_.jpg",
    synopsis:
      "La mayor conspiración de los últimos 2000 años está a punto de ser desvelada. Robert Langdon recibe una llamada en mitad de la noche: el conservador del museo del Louvre ha sido asesinado en extrañas circunstancias y junto a su cadáver ha aparecido un desconcertante mensaje cifrado. Al profundizar en la investigación, Langdon, experto en simbología, descubre que las pistas conducen a las obras de Leonardo Da Vinci…y que están a la vista de todos, ocultas por el ingenio del pintor.Langdon une esfuerzos con la criptóloga francesa Sophie Neveu y descubre que el conservador del museo pertenecía al priorato de Sión, una sociedad que a lo largo de los siglos ha contado con miembros tan destacados como sir Isaac Newton, Botticelli, Victor Hugo o el propio Da Vinci, y que ha velado por mantener en secreto una sorprendente verdad histórica.Una mezcla trepidante de aventuras, intrigas vaticanas, simbología y enigmas cifrados que provocó una extraordinaria polémica al poner en duda algunos de los dogmas sobre los que se asienta la Iglesia católica. Una de las novelas más leídas de todos los tiempos.",
    category: "Policíaca",
    autor: "Dan Brown",
    year: 2003,
    pages: 519,
    type: "Libro",
    price: 8.99,
  },
  {
    document_id: "4",
    title: "Moby Dick",
    url_image:
      "https://www.castellnouedicions.com/editorial-escolar/fotos/moby-dick-3.jpg",
    synopsis:
      "La irracional obsesión por la venganza de un hombre que quiere acabar con el que él considera su enemigo a toda costa.El capitán Ahab, apoyado sobre su pierna fabricada con una mandíbula de cachalote, empuja a su tripulación del Pequod al desastre en su obsesión por acabar con la ballena blanca, con Moby Dick; esa reencarnación del mal que mutiló su cuerpo y su alma para siempre. Una novela de aventuras imprescindible, un compendio sobre los balleneros y el mar y un clásico de la literatura universal de todos los tiempos.",
    category: "Aventuras",
    autor: "Herman Melville",
    year: 1851,
    pages: 823,
    type: "Libro",
    price: 0,
  },
];

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
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(book);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === "") {
      setFilteredBooks(book);
      return;
    }

    const searchTerms = text
      .split(",")
      .map((term) => term.trim().toLowerCase());

    setFilteredBooks(
      book.filter((book) => {
        // Verificar que TODOS los términos de búsqueda coincidan en ALGÚN campo
        return searchTerms.every((term) => {
          if (!term) return true; // Ignorar términos vacíos

          return (
            book.title.toLowerCase().includes(term) ||
            book.category.toLowerCase().includes(term) ||
            book.autor.toLowerCase().includes(term) ||
            book.year.toString().includes(term) ||
            book.type.toLowerCase().includes(term)
          );
        });
      }),
    );
  };

  const navigateToBookDetails = (selectedBook) => {
    navigation.navigate("BookDetails", {
      bookId: selectedBook.document_id,
      bookTitle: selectedBook.title,
      bookImage: selectedBook.url_image,
      bookSynopsis: selectedBook.synopsis,
      bookAutor: selectedBook.autor,
      bookCategory: selectedBook.category,
      bookYear: selectedBook.year,
      bookPage: selectedBook.pages,
      bookType: selectedBook.type,
      bookPrice: selectedBook.price,
    });
  };

  return (
    <ScrollView contentContainerStyle={viewStyles.mainContainer}>
      <CustomTextBoxFind
        placeholder="Buscar"
        value={searchText}
        onChangeText={handleSearch}
      />
      <View style={styles.elements}>
        {filteredBooks.map((item) => (
          <View key={item.document_id} style={styles.bookContainer}>
            <BookLite
              title="Pulsa para abrir"
              onPress={() => navigateToBookDetails(item)}
              image={item.url_image}
            />
            <View style={styles.bookDescription}>
              <Text style={styles.bookTitle}>Título: {item.title}</Text>
              <Text style={styles.bookCategory}>
                Categoría: {item.category}
              </Text>
              <Text style={styles.bookAutor}>Autor: {item.autor}</Text>
              <Text style={styles.bookYear}>Año: {item.year}</Text>
              <Text style={styles.bookType}>Tipo: {item.type}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
    flexWrap: "wrap",
    gap: 10,
  },
  bookTitle: {
    width: "100%",
  },
  bookCategory: {},
});
