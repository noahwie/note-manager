import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateUserPasswordAsUser } from "../services/api";

const UserProfile = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <p>No user data found.</p>;
  }

  const handlePasswordChange = async () => {
    if (!password) {
      return alert("Please enter a new password");
    }

    setLoading(true);
    try {
      await updateUserPasswordAsUser(password);
      alert("Password updated successfully!");
      setPassword("");
    } catch (err) {
      console.error("Failed to update password:", err);
      alert(err?.message || "Error updating password");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-users-container">
      <h2>User Profile</h2>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>New Password</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
              <td>
                <button
                  className="update-btn"
                  onClick={handlePasswordChange}
                  disabled={loading || !password}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
