import { StyleSheet } from "react-native";

import color from "../config/colors.json";

const viewStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: color["app-background"],
  },

  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 14,
    color: color["dark-text"],
  },
});

export default viewStyles;
