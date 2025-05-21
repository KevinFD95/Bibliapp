import * as SecureStore from "expo-secure-store";
import { login, validateToken } from "../api/auth.js";

export async function handleLogin(user, navigation) {
  if (!user.identifier || !user.user_password) {
    return { error: true, message: "Por favor, complete todos los campos" };
  }

  try {
    const response = await login(user);
    const { ok, status, data } = response;

    if (ok && data.access_token) {
      await SecureStore.setItemAsync("access_token", data.access_token);
      navigation.reset({ index: 0, routes: [{ name: "HomeView" }] });
      return { error: false };
    } else if (status === 404) {
      return { error: true, message: "Usuario o contraseña incorrectos." };
    } else {
      return {
        error: true,
        message: data.message || "Error inesperado, pruebe más tarde.",
      };
    }
  } catch {
    return { error: true, message: "Error inesperado, pruebe más tarde." };
  }
}

export async function validateUserToken(navigation) {
  const token = await SecureStore.getItemAsync("access_token");

  if (!token) return;

  try {
    const response = await validateToken();
    const { ok, status } = response;

    if (ok || status === 200) {
      navigation.reset({ index: 0, routes: [{ name: "HomeView" }] });
      return { error: false };
    }

    return {
      error: true,
    };
  } catch {
    return {
      message: "Sesión caducada. Vuelva a iniciar sesión.",
    };
  }
}
