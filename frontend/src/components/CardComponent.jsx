import { Pressable, Text, StyleSheet, View, Image } from "react-native";

export default function BookLite({ title, image, onPress, cardStyle }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, cardStyle]}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </Pressable>
  );
}

export function BookLiteCart({ image, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.cardcart}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text>No Image</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 140,
    height: 220,
  },

  cardcart: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 140,
    height: 200,
  },

  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: "serif",
  },

  noImage: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: "cover",
  },
});
