import { customFetch } from "./index.js";

export function getDocuments() {
  return customFetch("/docs");
}

export function getDocument(id) {
  return customFetch("/docs/" + id);
}

export function createBook(book) {
  return customFetch("/docs", {
    method: "POST",
    body: JSON.stringify(book),
  });
}
