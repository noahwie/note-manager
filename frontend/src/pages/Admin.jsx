// src/pages/Admin.jsx
import { useState, useEffect } from "react";
import AdminTable from "../components/AdminTable";
import { getUsers, updateUserPassword } from "../services/api";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response); // response.data
      console.log(response)
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (userId, newPassword) => {
    try {
      await updateUserPassword(userId, newPassword);
      alert("Password updated!");
    } catch (err) {
      console.error("Failed to update password:", err);
      alert("Error updating password");
    }
  };

  return (
    <div>
      <h1>Admin Panel: Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminTable users={users} onSetPassword={handleSetPassword} />
      )}
    </div>
  );
}

export default Admin;