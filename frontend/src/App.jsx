import { Routes, Route } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout";
import Login from "./pages/Login";  // ← NEU
import Forbidden from './pages/Forbidden'; // ← NEU
import ProtectedRoute from "./components/protected-route";
import MainPage from "./pages/MainPage";
import Admin from "./pages/Admin";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Öffentliche Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forbidden" element={<Forbidden />} />
        {/* Geschützte Routes - nur für eingeloggte User */}
        <Route 
          path="" 
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="user" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />

        {/* Admin Route - nur für ADMIN Rolle */}
        <Route 
          path="admin" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Admin />
            </ProtectedRoute>
          } 
        />

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;


