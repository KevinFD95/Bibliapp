import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  iconsBox: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },

  image: {
    height: 150,
    width: 150,
    alignItems: "center",
  },

  rowContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 20,
  },

  logoutContainer: {
    position: "absolute",
    bottom: 0,
    right: 20,
    marginBottom: 20,
  },
});
