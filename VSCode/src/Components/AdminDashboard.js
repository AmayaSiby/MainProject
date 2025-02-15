import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then(response => response.json())
      .then(data => setUsers(data.filter(user => user.role !== "Admin")))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const toggleBlockUser = (id, isBlocked) => {
    const url = `http://localhost:8080/api/users/${id}/${isBlocked ? "unblock" : "block"}`;

    fetch(url, { method: "POST" })
      .then(response => response.text())
      .then(() => {
        setUsers(users.map(user => 
          user.id === id ? { ...user, blocked: !isBlocked } : user
        ));
      })
      .catch(error => console.error("Error blocking user:", error));
  };

  const handleLogout = () => {
    // Clear any stored authentication data (example: localStorage or sessionStorage)
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      {/* Logout Button (Top Right) */}
      <button 
        onClick={handleLogout} 
        style={{
          position: "absolute",
          top: "5px",
          right: "20px",
          padding: "10px 15px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Logout
      </button>

      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => toggleBlockUser(user.id, user.blocked)}>
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
