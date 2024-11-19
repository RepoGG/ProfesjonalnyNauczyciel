import React from "react";
import { FaBook, FaUsers, FaCog } from "react-icons/fa";
import LogoutButton from "../components/auth/Logout";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./css/Home.css";

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
              <FaBook /> Kursy
            </li>
            <li>
              <FaCog /> Profil
            </li>
            {user.role === "admin" && (
              <li>
                <FaUsers /> Zarządzaj Użytkownikami
              </li>
            )}
          </ul>
        </aside>

        <section className="dashboard-main">
          <h2>
            Witaj, {user.role === "admin" ? "Administratorze" : "Użytkowniku"}!
          </h2>
          {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
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

const AdminDashboard = () => (
  <div className="dashboard-panel">
    <h2>Panel Administratora</h2>
    <p>Możesz zarządzać użytkownikami i kursami tutaj.</p>
  </div>
);

const UserDashboard = () => (
  <div className="dashboard-panel">
    <h2>Twoje Kursy</h2>
    <p>Możesz przeglądać swoje dostępne kursy tutaj.</p>
  </div>
);

export default Dashboard;
