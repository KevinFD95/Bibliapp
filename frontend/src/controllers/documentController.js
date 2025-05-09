import {
  getDocuments,
  getDocumentsRandom,
  getDocumentsRandomByCategories,
} from "../api/documents.js";

export async function fetchAllDocuments() {
  try {
    const response = await getDocuments();
    const { ok, status, data } = response;

    if (ok || status === 200) {
      return { success: true, data: data.documents };
    } else {
      return { success: false, error: "Error al obtener documentos." };
    }
  } catch {
    return {
      success: false,
      error: "Hubo un error al conectar con el servidor.",
    };
  }
}

export async function fetchRandomDocuments() {
  try {
    const response = await getDocumentsRandom();
    const { ok, status, data } = response;

    if (ok || status === 200) {
      return { success: true, data: data.documents };
    } else {
      const errorMessage =
        data?.message ||
        `Error al obtener documentos aleatorios generales. Estado: ${status}`;
      return { success: false, error: errorMessage };
    }
  } catch (e) {
    console.error("Error fetching general de documentos random:", e);
    return {
      success: false,
      error:
        "Hubo un error al conectar con el servidor para obtener random general.",
    };
  }
}

export async function fetchRandomDocumentsByCategories() {
  try {
    const response = await getDocumentsRandomByCategories();
    const { ok, status, data } = response;

    if (ok || status === 200) {
      return { success: true, data: data.documents };
    } else {
      const errorMessage =
        data?.message ||
        `Error al obtener recomendaciones basadas en categorías. Estado: ${status}`;
      return { success: false, error: errorMessage };
    }
  } catch (e) {
    console.error("Error al obtener recomendaciones basadas en categorías:", e);
    return {
      success: false,
      error:
        "Hubo un error al conectar con el servidor para obtener recomendaciones.",
    };
  }
}
