import { customFetch } from "./index.js";

export function getDocuments() {
  return customFetch("/docs");
}

export function getDocument(id) {
  return customFetch("/docs/" + id);
}

export function getEpub(id) {
  return customFetch("/epub/" + id);
}

export function getCart(username) {
  return customFetch("/cart/" + username);
}

export function buy_doc_cart(username) {
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

export function createBook(book) {
  return customFetch("/docs", {
    method: "POST",
    body: JSON.stringify(book),
  });
}
