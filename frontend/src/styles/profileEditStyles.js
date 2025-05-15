import { StyleSheet } from "react-native";

export const styles = (theme) => {
  return StyleSheet.create({
    box: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    text: {
      marginBottom: 20,
    },

    cameraContainer: {
      backgroundColor: theme["app-background"],
      borderColor: theme["selected-icons"],
      height: 60,
      width: 60,
      paddingLeft: 2,
      borderRadius: "100%",
      borderWidth: 2,
      position: "absolute",
      zIndex: 1,
      bottom: 10,
      right: 90,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
