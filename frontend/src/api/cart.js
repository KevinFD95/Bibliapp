import { customFetch } from "./index.js";

export function getCart() {
  return customFetch("/cart/");
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

export function buyDocCart(username) {
  return customFetch("/cart/" + username);
}

export function deleteCart(documentId) {
  return customFetch(`/cart/${documentId}`, {
    method: "DELETE",
  });
}
