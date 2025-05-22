import { customFetch } from "./index.js";

export function getDocuments() {
  return customFetch("/docs");
}

export function getDocumentsNews() {
  return customFetch("/docs/news");
}

export function getDocumentsRandom() {
  return customFetch("/random");
}

export function getDocumentsRandomByCategories() {
  return customFetch("/random/by_categories");
}

export function getDocumentDetails(id) {
  return customFetch("/docs/details/" + id);
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
