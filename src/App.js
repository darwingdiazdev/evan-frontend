import React, { useState } from 'react';
import ReportForm from './ReportForm';
import ReportList from './ReportList';
import Totales from './Totales';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [view, setView] = useState('form'); // "form" o "list"

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">Invasión Evangelística</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${view === 'form' ? 'fw-bold' : ''}`}
                  onClick={() => setView('form')}
                >
                  Nuevo Reporte
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${view === 'list' ? 'fw-bold' : ''}`}
                  onClick={() => setView('list')}
                >
                  Ver Reportes
                </button>
              </li>
               <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white ${view === 'totales' ? 'fw-bold' : ''}`}
                  onClick={() => setView('totales')}
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
