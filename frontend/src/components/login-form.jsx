import { useState, memo } from "react";
import Button from "./button";

const LoginForm = memo(({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameOrEmailError, setUsernameOrEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validateUsernameOrEmail = (value) => {
    if (!value.trim()) {
      setUsernameOrEmailError("Benutzername oder Email ist erforderlich");
      return false;
    }
    if (value.length < 3) {
      setUsernameOrEmailError("Mindestens 3 Zeichen erforderlich");
      return false;
    }
    setUsernameOrEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Passwort ist erforderlich");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Passwort muss mindestens 6 Zeichen haben");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const okUser = validateUsernameOrEmail(usernameOrEmail);
    const okPass = validatePassword(password);
    if (!okUser || !okPass || isLoading) return;

    setIsLoading(true);
    try {
      await onLogin({ usernameOrEmail, password });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-users-container auth-table-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username / Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="username oder email@example.com"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  {usernameOrEmailError && (
                    <div className="table-error">{usernameOrEmailError}</div>
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
                    text={isLoading ? "Lädt..." : "Einloggen"}
                    disabled={isLoading}
                    className="update-btn"
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

export default LoginForm;
