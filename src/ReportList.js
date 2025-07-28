import { useEffect, useState } from 'react';
import { deleteReport, getReports } from './api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from './auth';


export default function ReportList({ refresh }) {

  const { user } = useAuth();
  console.log('user', user);
  
  const [reports, setReports] = useState([]);
      const navigate = useNavigate();

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

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r._id !== id));

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El reporte ha sido eliminado correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al intentar eliminar el reporte.'
      });
    }
  }
};


   const handleGoToDetail = (id) => {
    navigate(`/reports/${id}`); 
  };

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
                <th>Pastor</th>
                <th>Capitan</th>
                <th>Actividad</th>
                <th>Evangelizados</th>
                <th>Sanidades</th>
                <th>Reconciliados</th>
                <th>Niños evangelizados</th>
                <th>Casas visitadas</th>
                <th>Tratados entregados</th>
                <th>Convertidos</th>
                <th>Discipulados</th>
                <th>Ofrendas(bs.)</th>
                <th>Fecha</th>
                {user.role !== 'capitan' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody >
              {reports.map((r, idx) => (
                <tr key={r._id}>
                  <td>{idx + 1}</td>
                  <td>{r.region}</td>
                  <td>{r.iglesia}</td>
                  <td>{r.comentario}</td>
                  <td>{r.actividad}</td>
                  <td>{r.evangelizados}</td>
                  <td>{r.sanidades}</td>
                  <td>{r.reconciliados}</td>
                  <td>{r.kids}</td>
                  <td>{r.house}</td>
                  <td>{r.trate}</td>
                  <td>{r.convertidos}</td>
                  <td>{r.discipulados}</td>
                  <td>{parseFloat(r.ofrendas).toFixed(2)}</td>
                  <td>{new Date(r.fecha).toLocaleDateString()}</td>
                 {user.role !== 'capitan' && 
                  <td>
                    <button
                      onClick={() => handleGoToDetail(r._id)}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <i className="bi bi-eye"
                      onClick={() => handleGoToDetail(r._id)}
                      ></i> 
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>  }             
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
