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

  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  h3: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  h4: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  h5: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
  },

  p: {
    fontSize: 14,
    fontWeight: 500,
    color: color["dark-text"],
  },

  enfasis: {
    fontSize: 14,
    fontWeight: 600,
    fontStyle: "italic",
  },
});

export default viewStyles;
