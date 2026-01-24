import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


/**
 * ProtectedRoute Component
 * Schützt Routen vor unauthentifizierten Zugriffen
 * 
 * @param {ReactNode} children - Die zu schützende Component
 * @param {string} requiredRole - Optional: Erforderliche Rolle (z.B. "ADMIN")
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Während AuthContext noch lädt, zeige Loading
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <h2>Lädt...</h2>
      </div>
    );
  }

  // ===================================
  // Check 1: Ist User eingeloggt?
  // ===================================
  if (!isAuthenticated) {
    console.log('🚫 ProtectedRoute: Nicht eingeloggt - Redirect zu /login');
    return <Navigate to="/login" replace />;
  }

  // ===================================
  // Check 2: Hat User die richtige Rolle? (optional)
  // ===================================
  if (requiredRole && user?.role !== requiredRole) {
    console.log(`🚫 ProtectedRoute: Rolle "${user?.role}" nicht ausreichend. Erforderlich: "${requiredRole}"`);
    
    // Redirect zu Forbidden Page (oder zurück zu Home)
    return <Navigate to="/forbidden" replace />;
  }

  // ===================================
  // Alle Checks bestanden ✅
  // ===================================
  console.log('✅ ProtectedRoute: Zugriff gewährt');
  return children;
};

export default ProtectedRoute;

