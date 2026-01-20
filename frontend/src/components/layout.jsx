import { Outlet } from "react-router-dom";
import Navigation from "./navigation";

const Layout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-2">
          <img src="/vite.svg" className="App-logo" alt="logo" />
          <h1>Note Manager</h1>
        </div>
        <Navigation />
      </header>

      <main className="layout-main-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>© {currentYear} AdonisGmbh. All rights reserved.</p>
        <p>Made with ❤️ by AdonisGmbh</p>
      </footer>
    </div>
  );
};

export default Layout;
