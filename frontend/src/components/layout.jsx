import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./navigation";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    if (isAuthenticated) {
      navigate("/"); // Navigate to protected home
    } else {
      navigate("/login"); // Redirect non-authenticated users to login
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div 
          className="Header-2" 
          style={{ cursor: 'pointer' }} 
          onClick={handleHeaderClick}
        >
          <img src="/vite.svg" className="App-logo" alt="logo" />
          <h1>Note Manager</h1>
        </div>

        <Navigation />
      </header>

      <main className="layout-main-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>© {currentYear} NoreGmbh. All rights reserved.</p>
        <p>.𖥔 ݁ ˖🛸── .✦</p>
      </footer>
    </div>
  );
};

export default Layout;
