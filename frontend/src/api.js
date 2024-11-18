import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // Obsługa ciasteczek
  headers: {
    Accept: "application/json",
  },
});

// Pobieranie tokena CSRF z ciasteczek
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

export const logoutUser = async () => {
  await api.post("/api/logout"); // Wywołanie API logout
  localStorage.removeItem("user"); // Czyszczenie lokalnego storage
};

export default api;
