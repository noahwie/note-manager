import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateUserPasswordAsAdmin } from "../services/api"; // API must verify old password

const UserProfile = () => {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <p>No user data found.</p>;
  }

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      return alert("Please enter both your current and new password");
    }

    setLoading(true);
    try {
      // API call should verify old password and update to new password
      await updateUserPasswordAsAdmin(user.id, oldPassword, newPassword);
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Failed to update password:", err);
      alert(err?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}>
      <h2>User Profile</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Current Password:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{ marginLeft: "10px", padding: "4px 8px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ marginLeft: "10px", padding: "4px 8px" }}
            />
          </label>
        </div>

        <button
          onClick={handlePasswordChange}
          disabled={loading}
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
