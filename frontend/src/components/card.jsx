import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import color from "../config/colors.json";
import { useNavigation } from "@react-navigation/native"; // Importamos useNavigation

export function CustomCard({ title, description, destination }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(destination);
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: color["white"],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color["gray"],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: color["black"],
  },
  description: {
    fontSize: 14,
    color: color["gray"],
  },
});
