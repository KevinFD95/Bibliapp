import React from "react";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function BookLite({ title, image, destination, params }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(destination, params);
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: "cover",
  },
});
