import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    color: "#666",
    paddingBottom: 5,
  },
  synopsisContent: {
    fontSize: 16,
    color: "#666",
    paddingBottom: 35,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 5,
    paddingLeft: 20,
    gap: 10,
    flex: 1,
  },
  centered: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  seriesItem: {
    alignItems: "center",
  },
  scaledBookLite: {
    transform: [{ scale: 0.4 }],
    marginTop: -60,
    marginBottom: -60,
  },
});
