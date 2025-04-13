import * as SecureStore from "expo-secure-store";

const API_URL = "http://127.0.0.1:5000/api";
const FRONTEND_CLIENT = "Bibliapp-Mobile-Agent";

export async function customFetch(endpoint, options = {}) {
  const token = await SecureStore.getItemAsync("access_token");
  const headers = {
    "Content-Type": "application/json",
    "X-Frontend-Client": FRONTEND_CLIENT,
    ...options.headers,
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error en la API");
  }

  return response.json();
}
