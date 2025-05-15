import { StyleSheet } from "react-native";

export const styles = (theme) =>
  StyleSheet.create({
    loadingScreen: {
      flex: 1,
      backgroundColor: theme["app-background"],
      justifyContent: "center",
      alignItems: "center",
    },

    noDocsScreen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    noDocsTitle: {
      marginBottom: 30,
      textAlign: "center",
    },

    noDocsTextContainer: {
      alignItems: "center",
      gap: 8,
    },

    noDocsText: {
      textAlign: "center",
    },

    filterContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
      justifyContent: "space-between",
      alignItems: "center",
    },

    filterOrder: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },

    filterPressable: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },

    cardScreen: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 30,
    },

    dropdownContainer: {
      position: "absolute",
      top: 50,
      width: "100%",
      marginHorizontal: 20,
      backgroundColor: theme["nav-background"],
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme["dark-text"],
      borderBottomWidth: 0,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 1,
      overflow: "hidden",
    },

    dropdownOption: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme["dark-text"],
      alignItems: "center",
    },

    dropdownOptionText: {
      fontSize: 16,
      color: theme["dark-text"],
    },
  });
