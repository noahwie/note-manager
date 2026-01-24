// src/components/AdminUsersTable.jsx
import { useState } from "react";

function AdminTable({ users, onSetPassword }) {
  const [passwords, setPasswords] = useState({}); // { userId: newPassword }

  const handleChange = (userId, value) => {
    setPasswords((prev) => ({ ...prev, [userId]: value }));
  };

  return (
    <table border="1" cellPadding="8">
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
                value={passwords[user.id] || ""}
                onChange={(e) => handleChange(user.id, e.target.value)}
              />
            </td>
            <td>
              <button onClick={() => onSetPassword(user.id, passwords[user.id])}>
                Set Password
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminTable;
