import { customFetch } from "./ndex.js";

export function getProfile() {
  return customFetch("/users/profile", {
    method: "GET",
  });
}

export function updateProfile(user) {
  return customFetch("/users/" + user.username, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
}
