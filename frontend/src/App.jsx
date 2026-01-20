import { Routes, Route } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout";
import Login from "./pages/Login";  // ← NEU
import Forbidden from './pages/Forbidden'; // ← NEU
import ProtectedRoute from "./components/protected-route";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Öffentliche Routes */}
        <Route path="login" element={<Login />} />
        <Route path="forbidden" element={<Forbidden />} />
        {/* Geschützte Routes - nur für eingeloggte User */}
        <Route 
          path="home" 
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />

        {/* Admin Route - nur für ADMIN Rolle */}
        {/* <Route 
          path="admin" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminPage />
            </ProtectedRoute>
          } 
        /> */}

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;


