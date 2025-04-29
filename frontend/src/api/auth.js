import { customFetch } from "./index.js";

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

export function forgotPassword(email) {
  return customFetch("/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(email, token, code, password) {
  return customFetch("/reset-password", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      token: token,
      code: code,
      new_password: password,
    }),
  });
}
