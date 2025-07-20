import React, { useState } from 'react';
import ReportForm from './ReportForm';
import ReportList from './ReportList';
import Totales from './Totales';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [view, setView] = useState('form');
  const [menuOpen, setMenuOpen] = useState(false); // 👈 para manejar el menú colapsado

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setMenuOpen(false); // cerrar menú al seleccionar opción
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">Invasión Evangelística</span>

          {/* Botón toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú colapsable */}
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${view === 'form' ? 'fw-bold' : ''}`}
                  onClick={() => handleViewChange('form')}
                >
                  Nuevo Reporte
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${view === 'list' ? 'fw-bold' : ''}`}
                  onClick={() => handleViewChange('list')}
                >
                  Ver Reportes
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${view === 'totales' ? 'fw-bold' : ''}`}
                  onClick={() => handleViewChange('totales')}
                >
                  Ver Totales
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {view === 'form' && <ReportForm onSuccess={() => setRefresh(!refresh)} />}
        {view === 'list' && <ReportList refresh={refresh} />}
        {view === 'totales' && <Totales />}
      </div>
    </div>
  );
}

export default App;
