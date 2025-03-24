import React from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";

export default function BookLite({ title, image, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
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
    marginBottom: 30,
    marginHorizontal: 15,
    width: "140",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",

    fontStyle: "italic",
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: "cover",
  },
});
