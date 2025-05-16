import { StyleSheet } from "react-native";

export const viewStyles = (theme) => {
  return StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme["app-background"],
    },

    h1: {
      flexWrap: "wrap",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme["dark-text"],
    },

    h2: {
      flexWrap: "wrap",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme["dark-text"],
    },

    h3: {
      flexWrap: "wrap",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme["dark-text"],
    },

    h4: {
      flexWrap: "wrap",
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme["dark-text"],
    },

    h5: {
      flexWrap: "wrap",
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 5,
      color: theme["dark-text"],
    },

    p: {
      flexWrap: "wrap",
      fontSize: 14,
      fontWeight: 500,
      color: theme["dark-text"],
    },

    enfasis: {
      flexWrap: "wrap",
      fontSize: 14,
      fontWeight: 600,
      fontStyle: "italic",
      color: theme["dark-text"],
    },

    required: {
      flexWrap: "wrap",
      fontSize: 14,
      fontWeight: 600,
      fontStyle: "italic",
      color: theme["required-text-color"],
    },
  });
};
