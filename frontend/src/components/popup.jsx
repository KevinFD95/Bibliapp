import React from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";
import color from "../config/colors.json";

export default function Popup({ visible, title, message, onClose }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text>{title}</Text>
          <Text>{message}</Text>
          <Pressable style={styles.button} onPress={() => onClose()}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  alertBox: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderColor: color.icons["selected-icons"],
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: color["dark-text"],
  },

  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: color["dark-text"],
  },

  button: {
    backgroundColor: color["button-background"],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },

  buttonText: {
    color: color["light-text"],
    textAlign: "center",
  },
});
