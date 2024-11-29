import React from "react";
import { FaBook, FaUsers, FaCog } from "react-icons/fa";
import LogoutButton from "../components/auth/Logout";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./css/Home.css";
import ManageUsers from "../components/auth/ManageUsers";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2>Nie jesteś zalogowany. Proszę się zalogować.</h2>;
  }

  return (
    <div className="dashboard-container">
      {/* Górne menu */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="site-name">ProfesjonalnyNauczyciel</div>
          <DropdownButton
            title={user.name}
            id="user-dropdown"
            variant="light"
            align="end"
          >
            <Dropdown.Item href="#/profile">Profil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <LogoutButton />
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </header>

      {/* Główna zawartość */}
      <main className="dashboard-content">
        <aside className="dashboard-sidebar">
          <h3>Menu</h3>
          <ul>
            <li>
              <FaBook /> <Link to="/dashboard/courses">Kursy</Link>
            </li>
            <li>
              <FaCog /> <Link to="/dashboard/profile">Profil</Link>
            </li>
            {user.role === "admin" && (
              <li>
                <FaUsers />{" "}
                <Link to="/dashboard/manage-users">
                  Zarządzaj Użytkownikami
                </Link>
              </li>
            )}
          </ul>
        </aside>

        {/* Dynamiczna środkowa sekcja */}
        <section className="dashboard-main">
          <Outlet /> {/* To miejsce na dynamicznie ładowane komponenty */}
        </section>

        <aside className="dashboard-right">
          <h3>Pomoc</h3>
          <p>Masz pytania? Skontaktuj się z nami!</p>
        </aside>
      </main>

      {/* Stopka */}
      <footer className="dashboard-footer">
        <div className="dashboard-footer-inner">
          <p>© 2024 ProfesjonalnyNauczyciel. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
