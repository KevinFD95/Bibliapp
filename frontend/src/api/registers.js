import { customFetch } from "./index.js";

export function getAllRegisters() {
  return customFetch("/registers/", {
    method: "GET",
  });
}
