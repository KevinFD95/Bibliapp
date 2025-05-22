import { customFetch } from "./index.js";

export function getCart() {
  return customFetch("/cart/", { method: "GET" });
}

export function getCartDoc(document_id) {
  return customFetch(`/cart/${document_id}`, {
    method: "GET",
  });
}

export function addCart(document_id) {
  return customFetch(`/cart/${document_id}`, {
    method: "POST",
  });
}

export function deleteCart(documentId) {
  return customFetch(`/cart/${documentId}`, {
    method: "DELETE",
  });
}

export function buyCart() {
  return customFetch("/cart/", {
    method: "POST",
  });
}
