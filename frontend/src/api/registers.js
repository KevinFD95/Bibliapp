import { customFetch } from "./index.js";

export function getAllRegisters() {
  return customFetch("/registers/", {
    method: "GET",
  });
}

export function checkIfRegistered(documentId) {
  return customFetch(`/registers/${documentId}`);
}
