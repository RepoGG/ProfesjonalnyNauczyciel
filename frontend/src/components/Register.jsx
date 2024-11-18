import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Zablokuj domyślne przeładowanie strony
    setError(""); // Wyczyść wcześniejsze błędy

    try {
      // Pobierz token CSRF
      await api.get("/sanctum/csrf-cookie");

      const response = await api.post("/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // Zalogowany użytkownik może być zapisany w stanie lub localStorage
      console.log("Rejestracja zakończona sukcesem:", response.data);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        // Obsługa błędów z backendu
        setError(
          err.response.data.message || "Wystąpił błąd, spróbuj ponownie"
        );
      } else {
        setError("Wystąpił problem z połączeniem");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Rejestracja</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Imię i nazwisko</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div style={{ marginBottom: "10px" }}>
          <label>Potwierdzenie hasła</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default Register;
