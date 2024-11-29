import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Home";
import ManageUsers from "./components/auth/ManageUsers";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard (zagnieżdżone trasy dla admina i użytkowników) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="courses" element={<h2>Tu będą kursy</h2>} />
          <Route path="profile" element={<h2>Tu będzie profil</h2>} />
        </Route>

        {/* Strony logowania i rejestracji */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Obsługa nieistniejących tras */}
        <Route path="*" element={<h1>404: Strona nie została znaleziona</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
