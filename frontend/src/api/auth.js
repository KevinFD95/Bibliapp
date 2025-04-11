import { customFetch, outsiteFetch } from "./index.js";

export function login(user) {
  return outsiteFetch("/login", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function register(user) {
  return outsiteFetch("/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function logout(token) {
  return customFetch("/logout", token, {
    method: "POST",
  });
}
