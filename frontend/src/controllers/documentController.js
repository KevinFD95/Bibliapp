import { getDocuments, getDocumentsRandom } from "../api/documents.js";

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
      return {
        success: false,
        error: "Error al obtener documentos recomendados.",
      };
    }
  } catch {
    return {
      success: false,
      error: "Hubo un error al conectar con el servidor para recomendaciones.",
    };
  }
}
