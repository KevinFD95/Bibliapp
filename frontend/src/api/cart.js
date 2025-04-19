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

export const deleteCart = async (username, documentId) => {
  try {
    const response = await customFetch(`/cart/${username}/${documentId}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error(
      `Error eliminando Documento: ${documentId} de la Tabla:`,
      error,
    );
    return { error: "Error al eliminar el libro del carrito." };
  }
};
