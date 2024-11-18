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

// Logowanie użytkownika
export const loginUser = async (email, password) => {
  await api.get("/sanctum/csrf-cookie"); // Pobierz token CSRF
  const response = await api.post("/api/login", { email, password }); // Zaloguj
  return response.data; // Zwróć dane użytkownika
};

// Pobieranie danych zalogowanego użytkownika
export const getUserData = async () => {
  const response = await api.get("/api/user"); // Endpoint zwracający dane użytkownika
  return response.data;
};

// Wylogowanie użytkownika
export const logoutUser = async () => {
  await api.post("/api/logout"); // Wywołanie API logout
  localStorage.removeItem("user"); // Czyszczenie lokalnego storage
};

export default api;
