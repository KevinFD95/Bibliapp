import { StyleSheet } from "react-native";

import color from "../config/colors.json";

const viewStyles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: color["app-background"],
  },

  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  p: {
    fontSize: 14,
    color: color["dark-text"],
  },
});

export default viewStyles;
