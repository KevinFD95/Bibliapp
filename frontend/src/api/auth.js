import { customFetch } from "./Index.js";

export function login(user) {
  return customFetch("/login", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function validateToken() {
  return customFetch("/validate-token", {
    method: "GET",
  });
}

export function register(user) {
  return customFetch("/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function logout() {
  return customFetch("/logout", {
    method: "POST",
  });
}
