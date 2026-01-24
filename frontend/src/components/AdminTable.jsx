// src/components/AdminUsersTable.jsx
import { useState } from "react";

function AdminTable({ users, onSetPassword }) {
  const [passwords, setPasswords] = useState({});

  const handleChange = (userId, value) => {
    setPasswords((prev) => ({ ...prev, [userId]: value }));
  };

  return (
    <div className="admin-users-container">
      <h2>Admin – User Management</h2>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>New Password</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <input
                    type="password"
                    placeholder="New password"
                    value={passwords[user.id] || ""}
                    onChange={(e) =>
                      handleChange(user.id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() =>
                      onSetPassword(user.id, passwords[user.id])
                    }
                  >
                    Set Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.7 }}>
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminTable;