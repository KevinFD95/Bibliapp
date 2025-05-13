// app/controllers/registerController.js
// Asegúrate de que la importación es correcta
import { checkIfRegistered, getAllRegisters } from "../api/registers.js";

export async function fetchIsRegistered(documentId) {
  try {
    const response = await checkIfRegistered(documentId);

    const { ok, status, data } = response;

    if (ok || status === 200) {
      if (data && typeof data.isRegistered === "boolean") {
        return { success: true, isRegistered: data.isRegistered };
      } else {
        console.error("Error fetchIsRegistered: Payload inesperado", data);
        return {
          success: false,
          error: "Respuesta inesperada del servidor al verificar registro",
          isRegistered: false,
        };
      }
    } else if (status === 401) {
      const errorMessage =
        data?.message ||
        "No autenticado. Inicia sesión para verificar registro.";
      console.error("Error fetchIsRegistered: 401 Unauthorized", errorMessage);
      return { success: false, error: errorMessage, isRegistered: false };
    } else {
      const errorMessage =
        data?.message ||
        `Error del servidor al verificar registro. Estado: ${status}`;
      console.error("Error fetchIsRegistered: Respuesta no OK", status, data);
      return { success: false, error: errorMessage, isRegistered: false };
    }
  } catch (e) {
    console.error("Error fetchIsRegistered (catch):", e);
    return {
      success: false,
      error:
        "Hubo un error al conectar con el servidor para verificar registro.",
      isRegistered: false,
    };
  }
}

export async function fetchAllRegisters() {
  try {
    const response = await getAllRegisters();
    const { ok, status, data } = response;
    if (ok || status === 200) {
      return { success: true, data: data.documents };
    } else {
      const errorMessage =
        data?.message || `Error al obtener la librería. Estado: ${status}`;
      return { success: false, error: errorMessage };
    }
  } catch (e) {
    console.error("Error fetching all registers:", e);
    return {
      success: false,
      error:
        "Hubo un error al conectar con el servidor para obtener la librería.",
    };
  }
}
