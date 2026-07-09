import api from "../api/axios";

export function getLabels() {
  return api.get("/labels");
}

export function createLabel(data) {
  return api.post("/labels", data);
}

export function updateLabel(id, data) {
  return api.put(`/labels/${id}`, data);
}

export function deleteLabel(id) {
  return api.delete(`/labels/${id}`);
}