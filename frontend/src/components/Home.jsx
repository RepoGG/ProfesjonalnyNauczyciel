import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Pobierz dane użytkownika

  if (!user) {
    return <h2>Nie jesteś zalogowany</h2>;
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user"); // Usuń dane użytkownika
      navigate("/login");
    } catch (error) {
      console.error("Błąd podczas wylogowania:", error);
    }
  };

  return (
    <div>
      <h1>Witaj, {user.name}!</h1>
      <p>Twoja rola: {user.role}</p>
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
};

export default Dashboard;
