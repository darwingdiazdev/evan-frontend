import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <img src="/logo.png" alt="logo" width="30" height="30" className="me-3" />
        <span className="navbar-brand">Invasión Evangelística</span>

        {/* Botón para colapsar navbar en móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          aria-controls="navbarSupportedContent" 
          aria-expanded={!isCollapsed} 
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
          {isAuthenticated ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/" onClick={() => setIsCollapsed(true)}>Nuevo</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/reportes" onClick={() => setIsCollapsed(true)}>Reportes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/totales" onClick={() => setIsCollapsed(true)}>Totales</Link></li>
              <li className="nav-item">
                <button
                    className="nav-link btn btn-link text-light"
                    style={{ cursor: 'pointer', padding: 9 }}
                    onClick={() => {
                    logout();
                    setIsCollapsed(true);
                    navigate('/login');
                    }}
                >
                    Salir
                </button>
                </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/login" onClick={() => setIsCollapsed(true)}>Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register" onClick={() => setIsCollapsed(true)}>Registro</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
