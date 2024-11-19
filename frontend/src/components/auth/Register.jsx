import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../../api";
import "./css/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Symulacja rejestracji (do zaimplementowania z backendem)
    if (password !== passwordConfirmation) {
      setError("Hasła nie są zgodne!");
      return;
    }

    alert("Rejestracja zakończona sukcesem!");
    navigate("/login");
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="register-title">Rejestracja</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="register-error">{error}</div>}
          <div className="register-field">
            <FaUser className="register-icon" />
            <input
              type="text"
              placeholder="Imię i nazwisko"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="register-field">
            <FaEnvelope className="register-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-field">
            <FaLock className="register-icon" />
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-field">
            <FaLock className="register-icon" />
            <input
              type="password"
              placeholder="Potwierdź hasło"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
