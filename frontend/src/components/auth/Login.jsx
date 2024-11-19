import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./css/Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Pobierz CSRF cookie
      await api.get("/sanctum/csrf-cookie");

      // Wyślij dane logowania
      const response = await api.post("/api/login", { email, password });

      // Zapisz dane użytkownika w localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Przekierowanie na dashboard
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Nieprawidłowy email lub hasło. Spróbuj ponownie.");
      } else {
        setError("Wystąpił błąd. Spróbuj ponownie później.");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Logowanie</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="login-field">
            <FaEnvelope className="login-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <FaLock className="login-icon" />
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
