import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register-form";
import { register } from "../services/auth-service"; // adjust if needed

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (registerData) => {
    setError("");

    try {
      await register(
        registerData.username,
        registerData.email,
        registerData.password
      );

      console.log("✅ Registrierung erfolgreich");
      navigate("/login");
    } catch (err) {
      console.error("❌ Registrierung fehlgeschlagen:", err);
      setError(err.message || "Registrierung fehlgeschlagen");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
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

        <RegisterForm onRegister={handleRegister} />

        <div className="auth-links">
          <p>Bereits registriert?</p>
          <p>
            <span
              style={{ cursor: "pointer", color: "#61dafb" }}
              onClick={() => navigate("/login")}
            >
              Zum Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
