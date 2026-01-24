import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/login-form";
import { useAuth } from "../contexts/AuthContext";  // ← NEU: Aus Context!

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();  // ← NEU: login aus AuthContext holen

  const handleLogin = async (loginData) => {
    setError("");
    
    try {
      // Jetzt AuthContext.login() verwenden (nicht mehr auth-service direkt!)
      await login(loginData.usernameOrEmail, loginData.password);
      
      console.log("✅ Login erfolgreich");
      navigate("/");
    } catch (err) {
      console.error("❌ Login fehlgeschlagen:", err);
      setError(err.message || "Login fehlgeschlagen");
      return;
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Error Message (wenn vorhanden) */}
        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              padding: "10px",
              backgroundColor: "#ffe6e6",
              borderRadius: "4px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* Bestehende LoginForm Component */}
        <LoginForm onLogin={handleLogin} />

        <div className="auth-links">
          <p>Noch kein Account?</p>
          <Link to="/register">Registrieren</Link>
        </div>

        {/* Test Credentials Hinweis */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#444444",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>Test-Accounts:</strong>
          <br />
          <br />
          <strong>Admin:</strong>
          <br />
          Username: admin
          <br />
          Email: admin@quiz.com
          <br />
          Passwort: admin123
          <br />
          <br />
          <strong>Normaler User:</strong>
          <br />
          Username: test1
          <br />
          Email: test1@gmail.com
          <br />
          Passwort: test123
        </div>
      </div>
    </div>
  );
};

export default Login;
