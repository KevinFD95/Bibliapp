import { StyleSheet } from "react-native";

export const styles = (theme) => {
  return StyleSheet.create({
    loadingScreen: {
      flex: 1,
      backgroundColor: theme["app-background"],
      alignItems: "center",
      justifyContent: "center",
    },

    emptyContainer: {
      flex: 1,
      backgroundColor: theme["app-background"],
      justifyContent: "center",
      alignItems: "center",
    },

    bookRow: {
      flexDirection: "row",
    },

    bookDetails: {
      flex: 1,
      paddingLeft: 15,
      gap: 10,
    },

    bookTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },

    bookAuthor: {
      fontSize: 14,
      color: "gray",
      marginBottom: 3,
    },

    bookDate: {
      fontSize: 12,
      color: "lightgray",
      marginBottom: 5,
    },

    bookPrice: {
      textAlign: "right",
      fontSize: 24,
      fontWeight: "bold",
      color: theme["dark-text"],
    },

    removeIconContainer: {
      alignItems: "flex-end",
    },

    removeIconImage: {
      width: 20,
      height: 20,
    },

    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme["nav-background"],
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: "100%",
      height: 140,
    },

    totalPriceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginBottom: 10,
    },

    totalText: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme["dark-text"],
    },

    priceText: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme["button-background"],
    },
  });
};
