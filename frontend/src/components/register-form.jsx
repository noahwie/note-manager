import { useState, memo } from "react";
import Button from "./button";

const RegisterForm = memo(({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validateUsername = (value) => {
    if (!value.trim()) {
      setUsernameError("Benutzername ist erforderlich");
      return false;
    }
    if (value.length < 3) {
      setUsernameError("Mindestens 3 Zeichen erforderlich");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Email ist erforderlich");
      return false;
    }
    if (!value.includes("@")) {
      setEmailError("Ungültige Email-Adresse");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Passwort ist erforderlich");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Mindestens 6 Zeichen erforderlich");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const okUser = validateUsername(username);
    const okEmail = validateEmail(email);
    const okPass = validatePassword(password);

    if (!okUser || !okEmail || !okPass || isLoading) return;

    setIsLoading(true);
    try {
      await onRegister({ username, email, password });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-users-container auth-table-container">
      <h2>Registrieren</h2>

      <form onSubmit={handleSubmit}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  {usernameError && (
                    <div className="table-error">{usernameError}</div>
                  )}
                </td>

                <td>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  {emailError && (
                    <div className="table-error">{emailError}</div>
                  )}
                </td>

                <td>
                  <input
                    type="password"
                    placeholder="Mindestens 6 Zeichen"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  {passwordError && (
                    <div className="table-error">{passwordError}</div>
                  )}
                </td>

                <td>
                  <Button
                    text={isLoading ? "Lädt..." : "Registrieren"}
                    disabled={isLoading}
                    className="create-btn"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
});

export default RegisterForm;
