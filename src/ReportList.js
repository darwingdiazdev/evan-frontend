import { useEffect, useState } from 'react';
import { deleteReport, getReports } from './api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from './auth';


export default function ReportList({ refresh }) {
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [reports, setReports] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reports.length / itemsPerPage);

 

// Función para generar el rango de páginas visibles
  const getPageRange = () => {
    const visiblePages = 6;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };



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
              {currentReports.map((r, idx) => (
                <tr key={r._id}>
                  <td>{indexOfFirstItem + idx + 1}</td>
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
          <nav className="mt-3 d-flex justify-content-center">
            <ul className="pagination">
              {/* Flecha izquierda */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              
              {/* Mostrar primera página si no está en el rango visible */}
              {getPageRange()[0] > 1 && (
                <>
                  <li className="page-item">
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </button>
                  </li>
                  {getPageRange()[0] > 2 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                </>
              )}
              
              {/* Páginas visibles */}
              {getPageRange().map((num) => (
                <li
                  key={num}
                  className={`page-item ${num === currentPage ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                </li>
              ))}
              
              {/* Mostrar última página si no está en el rango visible */}
              {getPageRange()[getPageRange().length - 1] < totalPages && (
                <>
                  {getPageRange()[getPageRange().length - 1] < totalPages - 1 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                  <li className="page-item">
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </li>
                </>
              )}
              
              {/* Flecha derecha */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="alert alert-info">No hay reportes disponibles.</div>
      )}
    </div>
  );
}
