import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./css/ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/users");
        setUsers(response.data);
      } catch (err) {
        setError("Nie udało się pobrać użytkowników.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
      try {
        await api.delete(`/api/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        setError("Nie udało się usunąć użytkownika.");
        console.error(err);
      }
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Zarządzanie Użytkownikami</h2>
      {error && <p className="error">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Email</th>
            <th>Rola</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roles.map((role) => role.name).join(", ")}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => alert(`Edytuj użytkownika: ${user.id}`)}
                >
                  <FaEdit /> Edytuj
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash /> Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
