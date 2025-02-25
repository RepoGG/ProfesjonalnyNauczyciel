import React, { useState } from "react";
import { FaBook, FaUsers, FaCog, FaPlus } from "react-icons/fa";
import LogoutButton from "../components/auth/Logout";
import { Dropdown, DropdownButton, Modal, Button, Form } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/Home.css";

const AddFieldModal = ({ show, handleClose, handleSave }) => {
  const [fieldData, setFieldData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFieldData({
      ...fieldData,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = () => {
    handleSave(fieldData);
    // Opcjonalnie czyścimy formularz po zapisaniu
    setFieldData({ name: "", description: "", image: "" });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj nowy kierunek</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFieldName">
            <Form.Label>Nazwa kierunku</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wpisz nazwę kierunku"
              name="name"
              value={fieldData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFieldDescription" className="mt-2">
            <Form.Label>Opis kierunku</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Wpisz opis kierunku"
              name="description"
              value={fieldData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFieldImage" className="mt-2">
            <Form.Label>URL obrazka</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wpisz URL obrazka"
              name="image"
              value={fieldData.image}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Anuluj
        </Button>
        <Button variant="primary" onClick={onSave}>
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [showAddField, setShowAddField] = useState(false);

  if (!user) {
    return <h2>Nie jesteś zalogowany. Proszę się zalogować.</h2>;
  }

  // Sprawdzamy, czy aktualna ścieżka zaczyna się od '/dashboard/fields'
  const isFieldsPage = location.pathname.startsWith("/dashboard/fields");

  const handleOpenAddField = () => {
    setShowAddField(true);
  };

  const handleCloseAddField = () => {
    setShowAddField(false);
  };

  const handleSaveField = (fieldData) => {
    // Wywołanie API do zapisu nowego kierunku
    axios
      .post(`${process.env.REACT_APP_API_URL}/fields`, fieldData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // Opcjonalnie: Możesz dodać logikę odświeżania listy kierunków
        console.log("Kierunek dodany:", response.data.field);
        setShowAddField(false);
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania kierunku:", error);
        // Opcjonalnie wyświetl komunikat błędu użytkownikowi
      });
  };

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
            <Dropdown.Item as={Link} to="/dashboard/profile">
              Profil
            </Dropdown.Item>
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
              <FaBook /> <Link to="/dashboard/fields">Kierunki</Link>
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
          <Outlet />
          {/* Kontener przycisku dodawania kierunków, umieszczony pod zawartością */}
          {isFieldsPage && (
            <div
              className="add-field-button-container"
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Button
                onClick={handleOpenAddField}
                variant="success"
                style={{
                  borderRadius: "50%",
                  width: "70px",
                  height: "70px",
                  fontSize: "28px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <FaPlus />
              </Button>
            </div>
          )}
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

      {/* Modal do dodawania kierunku */}
      <AddFieldModal
        show={showAddField}
        handleClose={handleCloseAddField}
        handleSave={handleSaveField}
      />
    </div>
  );
};

export default Dashboard;
