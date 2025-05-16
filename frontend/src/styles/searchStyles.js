import { StyleSheet } from "react-native";

export const styles = (theme) => {
  return StyleSheet.create({
    loadingScreen: {
      flex: 1,
      backgroundColor: theme["app-background"],
      alignItems: "center",
      justifyContent: "center",
    },

    elements: {
      width: "100%",
      gap: 20,
    },

    bookContainer: {
      width: "100%",
      gap: 10,
      flexDirection: "row",
    },

    bookDescription: {
      width: "80%",
      paddingVertical: 10,
      flexShrink: 1,
      gap: 10,
    },

    itemLine: {
      flexWrap: "wrap",
      flexDirection: "row",
    },
  });
};
