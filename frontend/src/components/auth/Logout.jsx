import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Przekierowanie na stronę logowania
      navigate("/login");
    } catch (err) {
      console.error("Błąd podczas wylogowania:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#FF6347",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Wyloguj się
    </button>
  );
};

export default LogoutButton;
