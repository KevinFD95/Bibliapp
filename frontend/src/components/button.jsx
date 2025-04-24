import React, { useContext } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext.jsx";

export function CustomButton({ text, onPress }) {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme["button-background"],
      width: "100%",
      marginVertical: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },

    text: {
      color: theme["button-text"],
      textAlign: "center",
      fontWeight: 600,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export function IconButton({ icon, onPress }) {
  return <Pressable onPress={onPress}>{icon}</Pressable>;
}
