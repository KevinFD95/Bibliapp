import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  icons: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 15,
  },

  box: {
    flexGrow: 1,
    marginTop: 50,
  },

  linkContainer: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
});
