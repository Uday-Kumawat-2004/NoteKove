import api from "../api/axios";

export function createNote(data) {
  return api.post("/notes", data);
}

export function getNotes(params = {}) {
  return api.get("/notes", {
    params,
  });
}

export function updateNote(id, data) {
  return api.put(`/notes/${id}`, data);
}

export function trashNote(id) {
  return api.delete(`/notes/${id}`);
}

export function restoreNote(id) {
  return api.put(`/notes/restore/${id}`, {});
}

export function permanentDeleteNote(id) {
  return api.delete(`/notes/${id}/permanent`);
}

export function searchNotes(query) {
  return api.get("/notes/search", {
    params: {
      q: query,
    },
  });
}