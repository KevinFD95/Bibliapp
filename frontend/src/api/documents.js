import { outsiteFetch } from "./index.js";

export function getDocuments() {
  return outsiteFetch("/docs");
}

export function getDocument(id) {
  return outsiteFetch("/docs/" + id);
}

export function createBook(book) {
  return outsiteFetch("/docs", {
    method: "POST",
    body: JSON.stringify(book),
  });
}
