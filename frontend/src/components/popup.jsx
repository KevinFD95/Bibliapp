import React from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";
import color from "../config/LightTheme.js";

export function Popup({ visible, title, message, onClose }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export function ConfirmPopup({ visible, title, message, onConfirm, onClose }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonBox}>
            <Pressable style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Sí</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  alertBox: {
    width: 300,
    maxHeight: "70%",
    backgroundColor: color["app-background"],
    borderWidth: 1,
    // borderColor: color["selected-icons"],
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    alignItems: "center",
    alignSelf: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: color["dark-text"],
    textAlign: "center",
    flexWrap: "wrap",
  },

  message: {
    fontSize: 16,
    textAlign: "center",
    color: color["dark-text"],
    flexWrap: "wrap",
  },

  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
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
    paddingHorizontal: 15,
  },
});
