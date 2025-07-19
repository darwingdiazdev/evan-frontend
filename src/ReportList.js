import { useEffect, useState } from 'react';
import { getReports } from './api';

export default function ReportList({ refresh }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports()
      .then((res) => {
        setReports(res); // Asegúrate de que sea un array
      })
      .catch((err) => {
        console.error('Error al obtener reportes:', err);
        setReports([]);
      });
  }, [refresh]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reportes registrados</h2>

      {reports.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Zona</th>
                <th>Iglesia</th>
                <th>Capitan</th>
                <th>Actividad</th>
                <th>Milagros</th>
                <th>Sanidades</th>
                <th>Salvaciones</th>
                <th>Ofrendas(bs.)</th>
                <th>Fecha</th>

              </tr>
            </thead>
            <tbody >
              {reports.map((r, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{r.region}</td>
                  <td>{r.iglesia}</td>
                  <td>{r.comentario}</td>
                  <td>{r.actividad}</td>
                  <td>{r.milagros}</td>
                  <td>{r.sanidades}</td>
                  <td>{r.salvaciones}</td>
                  <td>{parseFloat(r.ofrendas).toFixed(2)}</td>
                  <td>{new Date(r.fecha).toLocaleDateString()}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No hay reportes disponibles.</div>
      )}
    </div>
  );
}
