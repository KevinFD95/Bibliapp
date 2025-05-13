import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl;
const FRONTEND_CLIENT = Constants.expoConfig.extra.frontendClient;

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

  const data = await response.json().catch(() => ({}));

  return {
    status: response.status,
    ok: response.ok,
    data,
    message: data.message,
  };
}
