import { StyleSheet, ScrollView, FlatList, Text } from "react-native";

import BookLite from "../components/card.jsx";

import viewStyles from "../styles/view-styles.jsx";

const books = [
  {
    id: "1",
    title: "El Señor de los Anillos",
    image:
      "https://www.planetadelibros.com/usuaris/libros/fotos/357/original/portada_el-senor-de-los-anillos-1-la-comunidad-del-anillo_j-r-r-tolkien_202207271304.jpg",
    synopsis:
      "En la Tierra Media, el Señor Oscuro Sauron forjó los Grandes Anillos del Poder y creó uno con el poder de esclavizar a toda la Tierra Media. Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único con la misión de destruirlo. Acompañado de sus amigos, Frodo emprende un viaje hacia Mordor, el único lugar donde el anillo puede ser destruido. Sin embargo, Sauron ordena la persecución del grupo para recuperar el anillo y acabar con la Tierra Media.",
  },
  {
    id: "2",
    title: "El Psicoanalista",
    image: "https://m.media-amazon.com/images/I/814DrJ8lFlL.jpg",
    synopsis:
      "El día de su 53 cumpleaños, el doctor Starks, un psicoanalista con una larga carrera a sus espaldas, recibe un misterioso e inquietante anónimo. Starks tendrá que emplear toda su astucia para, en quince días, averiguar quién es el autor de la misiva. De no conseguirlo, deberá elegir entre suicidarse o ser testigo de cómo, uno tras otro, sus familiares y amigos van siendo asesinados por un psicópata que promete llevar hasta el fin su venganza. John Katzenbach alcanzó la popularidad con la publicación de El psicoanalista, un thriller inmejorable en el que explora con maestría las mentes desviadas.",
  },
  {
    id: "3",
    title: "El Código da Vinci",
    image:
      "https://m.media-amazon.com/images/I/71PR0C4XNjL._AC_UF1000,1000_QL80_.jpg",
    synopsis:
      "La mayor conspiración de los últimos 2000 años está a punto de ser desvelada. Robert Langdon recibe una llamada en mitad de la noche: el conservador del museo del Louvre ha sido asesinado en extrañas circunstancias y junto a su cadáver ha aparecido un desconcertante mensaje cifrado. Al profundizar en la investigación, Langdon, experto en simbología, descubre que las pistas conducen a las obras de Leonardo Da Vinci…y que están a la vista de todos, ocultas por el ingenio del pintor.Langdon une esfuerzos con la criptóloga francesa Sophie Neveu y descubre que el conservador del museo pertenecía al priorato de Sión, una sociedad que a lo largo de los siglos ha contado con miembros tan destacados como sir Isaac Newton, Botticelli, Victor Hugo o el propio Da Vinci, y que ha velado por mantener en secreto una sorprendente verdad histórica.Una mezcla trepidante de aventuras, intrigas vaticanas, simbología y enigmas cifrados que provocó una extraordinaria polémica al poner en duda algunos de los dogmas sobre los que se asienta la Iglesia católica. Una de las novelas más leídas de todos los tiempos.",
  },
  {
    id: "4",
    title: "Moby Dick",
    image:
      "https://www.castellnouedicions.com/editorial-escolar/fotos/moby-dick-3.jpg",
    synopsis:
      "La irracional obsesión por la venganza de un hombre que quiere acabar con el que él considera su enemigo a toda costa.El capitán Ahab, apoyado sobre su pierna fabricada con una mandíbula de cachalote, empuja a su tripulación del Pequod al desastre en su obsesión por acabar con la ballena blanca, con Moby Dick; esa reencarnación del mal que mutiló su cuerpo y su alma para siempre. Una novela de aventuras imprescindible, un compendio sobre los balleneros y el mar y un clásico de la literatura universal de todos los tiempos.",
  },
];

export default function HomeStackNavigator() {
  return (
    <ScrollView
      contentContainerStyle={[
        viewStyles.mainContainer,
        { justifyContent: "center" },
      ]}
    >
      <Text style={viewStyles.h1}>Novedades</Text>
      <FlatList
        contentContainerStyle={styles.section}
        nestedScrollEnabled={true}
        data={books}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookLite title={item.title} image={item.image} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={viewStyles.h1}>Recomendados para ti</Text>
      <FlatList
        contentContainerStyle={styles.section}
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookLite title={item.title} image={item.image} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    gap: 20,
    maxHeight: 250,
  },
});
