import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const navigate = useNavigate()

  const handleAdminClick = () => {
    if (isAuthenticated && user.role === 'ADMIN') {
      navigate("/admin"); // Navigate to protected home
    } else {
      navigate("/login"); // Redirect non-authenticated users to login
    }
  };

  const handleUserProfileClick = () => {
    if (isAuthenticated) {
      navigate("/user"); // Navigate to protected home
    } else {
      navigate("/login"); // Redirect non-authenticated users to login
    }
  };


  // Logout Handler
  const handleLogout = () => {
    console.log('🚪 Logout-Button geklickt');
    logout();
    // Optional: Redirect zu Home (wird automatisch gemacht durch AuthContext)
  };

  return (
    <nav className="layout-header-nav">
      {/* ===================================
          ÖFFENTLICHE LINKS (immer sichtbar)
          =================================== */}
    

      {/* ===================================
          GESCHÜTZTE LINKS (nur wenn eingeloggt)
          =================================== */}
      {isAuthenticated && (
        <>
        <button style={{ 
                color: '#ffffffff', 
                fontWeight: 'bold',
                padding: '5px 10px',
                backgroundColor:'#2a2a2a',
                borderRadius: '4px',
                
            }} onClick={handleAdminClick}>
            Admin
        </button>
        
        </>
      )}

      {/* ===================================
          AUTH BUTTONS
          =================================== */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {isAuthenticated ? (
          // Eingeloggt: Zeige Username + Logout
          <>
            <button style={{ 
              color: '#fdfdfdff', 
              fontWeight: 'bold',
              padding: '5px 10px',
              backgroundColor:'#2a2a2a',
              borderRadius: '4px'
            }} onClick={handleUserProfileClick}>
              👤 {user?.username || 'User'}
            </button>
            <button 
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </>
        ) : (
            <button>
                <Link to="/login">Login</Link>
            </button>
          // Nicht eingeloggt: Zeige Login Link
          
        )}
      </div>
    </nav>
  );
};

export default Navigation;

