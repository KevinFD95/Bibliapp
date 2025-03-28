import { Text, Pressable, StyleSheet } from "react-native";
import color from "../config/colors.json";

export function CustomButton({ text, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export function IconButton({ icon, onPress }) {
  return <Pressable onPress={onPress}>{icon}</Pressable>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: color["button-background"],
    width: "100%",
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  text: {
    color: color["light-text"],
    textAlign: "center",
  },
});
