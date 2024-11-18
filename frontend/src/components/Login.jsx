import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Korzystamy z globalnej instancji Axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Wyczyść wcześniejsze błędy

    try {
      // Pobierz CSRF cookie
      await api.get("/sanctum/csrf-cookie");

      // Wyślij dane logowania
      const response = await api.post("/api/login", {
        email,
        password,
      });

      // Zapisz dane użytkownika lub token, jeśli jest zwracany przez backend
      localStorage.setItem("user", JSON.stringify(response.data));

      // Przekierowanie na dashboard po zalogowaniu
      navigate("/dashboard");
    } catch (err) {
      // Obsługa błędów logowania
      if (err.response && err.response.status === 401) {
        setError("Nieprawidłowe dane logowania");
      } else {
        setError("Wystąpił błąd, spróbuj ponownie później");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Logowanie</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Hasło</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default Login;
