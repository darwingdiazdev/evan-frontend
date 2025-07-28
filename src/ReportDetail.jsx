import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReportById, updateReportNumbers } from './api';
import Swal from 'sweetalert2';

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getReportById(id)
      .then(data => {
        setReport(data);
        setFormData({
          evangelizados: data.evangelizados,
          sanidades: data.sanidades,
          convertidos: data.convertidos,
          reconciliados: data.reconciliados,
          kids: data.kids,
          house: data.house,
          trate: data.trate,
          discipulados: data.discipulados,
          ofrendas: data.ofrendas,
        });
      })
      .catch(err => console.error('Error al cargar el reporte:', err));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.name === 'ofrendas'
        ? parseFloat(e.target.value)
        : parseInt(e.target.value),
    }));
  };

  const handleSave = async () => {
  try {
    const updated = await updateReportNumbers(id, formData);
    setReport(updated);
    setEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Actualizado',
      text: 'Los campos numéricos se actualizaron correctamente',
      confirmButtonColor: '#3085d6',
    });
    navigate('/reportes');
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar el reporte. Intenta nuevamente.',
      confirmButtonColor: '#d33',
    });
  }
};

  if (!report) {
    return <div className="container mt-4">Cargando reporte...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Detalle del Reporte</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item"><strong>Zona:</strong> {report.region}</li>
        <li className="list-group-item"><strong>Pastor:</strong> {report.iglesia}</li>
        <li className="list-group-item"><strong>Capitán:</strong> {report.comentario}</li>
        <li className="list-group-item"><strong>Actividad:</strong> {report.actividad}</li>

       {[
          { key: 'evangelizados', label: 'Evangelizados' },
          { key: 'sanidades', label: 'Sanidades' },
          { key: 'reconciliados', label: 'Reconciliados' },
          { key: 'kids', label: 'Niños evangelizados' },
          { key: 'house', label: 'Casas visitadas' },
          { key: 'trate', label: 'Tratados entregados' },
          { key: 'convertidos', label: 'Convertidos' },
          { key: 'discipulados', label: 'Discipulados' },
          { key: 'ofrendas', label: 'Ofrendas' },
        ].map(({ key, label }) => (
          <li className="list-group-item" key={key}>
            <strong>{label}:</strong>{' '}
            {editing ? (
              <input
                type="number"
                name={key}
                className="form-control"
                value={formData[key]}
                onChange={handleChange}
              />
            ) : (
              key === 'ofrendas'
                ? parseFloat(report[key]).toFixed(2) + ' Bs'
                : report[key]
            )}
          </li>
        ))}


        <li className="list-group-item"><strong>Fecha:</strong> {new Date(report.fecha).toLocaleDateString()}</li>
      </ul>

      {editing ? (
        <button className="btn btn-success" onClick={handleSave}>Guardar</button>
      ) : (
        <button className="btn btn-warning" onClick={() => setEditing(true)}>Editar </button>
      )}
    </div>
  );
}
