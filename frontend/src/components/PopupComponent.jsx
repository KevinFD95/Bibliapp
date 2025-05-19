import { useContext } from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext.jsx";

export function Popup({ visible, title, message, onClose }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles(theme).overlay}>
        <View style={styles(theme).alertBox}>
          <Text style={styles(theme).title}>{title}</Text>
          <Text style={styles(theme).message}>{message}</Text>
          <Pressable style={styles(theme).button} onPress={onClose}>
            <Text style={styles(theme).buttonText}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export function ConfirmPopup({ visible, title, message, onConfirm, onClose }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles(theme).overlay}>
        <View style={styles(theme).alertBox}>
          <Text style={styles(theme).title}>{title}</Text>
          <Text style={styles(theme).message}>{message}</Text>
          <View style={styles(theme).buttonBox}>
            <Pressable style={styles(theme).button} onPress={onConfirm}>
              <Text style={styles(theme).buttonText}>Sí</Text>
            </Pressable>
            <Pressable style={styles(theme).button} onPress={onClose}>
              <Text style={styles(theme).buttonText}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = (theme) => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },

    alertBox: {
      width: 300,
      maxHeight: "70%",
      backgroundColor: theme["app-background"],
      borderWidth: 1,
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
      color: theme["dark-text"],
      textAlign: "center",
      flexWrap: "wrap",
    },

    message: {
      fontSize: 16,
      textAlign: "center",
      color: theme["dark-text"],
      flexWrap: "wrap",
    },

    buttonBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20,
    },

    button: {
      backgroundColor: theme["button-background"],
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 30,
    },

    buttonText: {
      color: theme["button-text"],
      textAlign: "center",
      paddingHorizontal: 15,
    },
  });
};
