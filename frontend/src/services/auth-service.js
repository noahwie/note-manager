import API from "./api";

/**
 * Login Funktion
 * Sendet Email + Passwort an Backend und speichert Token
 *
 * @param {string} email - User Email
 * @param {string} password - User Passwort
 * @returns {Promise<Object>} User Daten + Token
 */
export const login = async (usernameOrEmail, password) => {
  try {
    console.log("📧 Login-Versuch für:", usernameOrEmail);

    // POST Request an Backend
    const response = await API.post("/auth/login", {
      usernameOrEmail,
      password,
    });

    // Token aus Response extrahieren, 
    const { token, userId, username, email, role } = response.data;

    // Token in localStorage speichern
    localStorage.setItem("authToken", token);

    // User-Daten auch speichern (für schnellen Zugriff)
    const userData = { id: userId, username, email, role };
    localStorage.setItem("userData", JSON.stringify(userData));

    console.log("✅ Login erfolgreich - Token gespeichert");

    // Gesamte Response zurückgeben (enthält User-Daten)
    return response.data;
  } catch (error) {
    console.error("❌ Login fehlgeschlagen:", error);

    // Fehlermeldung vom Backend extrahieren (falls vorhanden)
    const errorMessage =
      error.response?.data?.message || "Login fehlgeschlagen";

    // Error mit besserer Message werfen
    throw new Error(errorMessage);
  }
};

/**
 * Logout Funktion
 * Löscht Token aus localStorage
 */
export const logout = () => {
  console.log('🚪 Logout - Daten werden gelöscht');
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

/**
 * Prüft ob User eingeloggt ist
 * @returns {boolean} true wenn Token existiert
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // !! konvertiert zu boolean
};

/**
 * Gibt den aktuellen Token zurück
 * @returns {string|null} Token oder null
 */
export const getToken = () => {
  return localStorage.getItem("authToken");
};

/**
 * Hole User-Daten aus localStorage
 * (Brauchen keinen Backend-Call, haben alles vom Login!)
 */
export const getUserData = () => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    return JSON.parse(userDataString);
  }
  return null;
};

/**
 * Register Funktion (optional - falls dein Backend das unterstützt)
 * @param {Object} userData - User Registrierungsdaten
 * @returns {Promise<Object>} Registrierungsbestätigung
 */
export const register = async (username, email, password, role = "USER") => {
  try {
    console.log("📝 Registrierung für:", email);

    const response = await API.post("/auth/register", {username, email, password, role});

    console.log("✅ Registrierung erfolgreich");
    return response.data;
  } catch (error) {
    console.error("❌ Registrierung fehlgeschlagen:", error);
    const errorMessage =
      error.response?.data?.message || "Registrierung fehlgeschlagen";
    throw new Error(errorMessage);
  }
};

