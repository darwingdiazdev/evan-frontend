import { useState,} from 'react';
import { getTotales } from './api';

export default function Totales() {
  const [zona, setZona] = useState('Zona 1');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [totales, setTotales] = useState(null);

  const handleBuscar = async () => {
    if (!desde || !hasta) return alert('Selecciona un rango de fechas');
    const data = await getTotales(zona, desde, hasta);
    setTotales(data);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Totales por zona y fechas</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Zona</label>
          <select className="form-select" value={zona} onChange={(e) => setZona(e.target.value)}>
            <option>Zona 1</option>
            <option>Zona 2</option>
            <option>Zona 3</option>
            <option>Zona 4</option>
            <option>Zona 5</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Desde</label>
          <input type="date" className="form-control" value={desde} onChange={(e) => setDesde(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Hasta</label>
          <input type="date" className="form-control" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={handleBuscar}>Buscar</button>
        </div>
      </div>

      {totales && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Totales en {zona}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Milagros: <strong>{totales.milagros}</strong></li>
              <li className="list-group-item">Salvaciones: <strong>{totales.salvaciones}</strong></li>
              <li className="list-group-item">Sanidades: <strong>{totales.sanidades}</strong></li>
              <li className="list-group-item">Ofrendas: <strong>Bs. {totales.ofrendas.toFixed(2) ?? "0.00"}</strong></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
