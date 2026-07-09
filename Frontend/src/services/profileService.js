import api from "../api/axios";

export function getProfile() {
  return api.get("/users/me");
}

export function updateProfile(data) {
  return api.put("/users/me", data);
}

export function changePassword(data) {
  return api.put("/users/change-password", data);
}

export function uploadProfilePicture(data) {
  return api.put("/users/profile-picture", data);
}