import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createReport } from './api';

export default function ReportForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    region: '',
    iglesia: '',
    actividad: '',
    milagros: 0,
    sanidades: 0,
    salvaciones: 0,
    ofrendas: 0,
    comentario: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReport(formData);
       Swal.fire({
        icon: 'success',
        title: '¡Reporte enviado!',
        text: 'El reporte fue registrado exitosamente.',
        confirmButtonText: 'Aceptar',
      });
      setFormData({
        region: '',
        iglesia: '',
        actividad: '',
        milagros: 0,
        sanidades: 0,
        salvaciones: 0,
        ofrendas: 0,
        comentario: '',
      });
      onSuccess();
    } catch (err) {
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el reporte, intenta de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h4 className="mb-3">Reporte Diario</h4>
      <p style={{ fontFamily: "'Merriweather', serif", fontSize: '1rem', lineHeight: '1.6', fontWeight: 'bold' }}>
        "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espiritu Santo" 
        Mateo 28:19
      </p>
      <div className="mb-3">
        <label htmlFor="region" className="form-label">Zona</label>
        <select
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Seleccione una zona</option>
          <option value="Zona 1">Zona 1</option>
          <option value="Zona 2">Zona 2</option>
          <option value="Zona 3">Zona 3</option>
          <option value="Zona 4">Zona 4</option>
          <option value="Zona 5">Zona 5</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Iglesia</label>
        <input
          name="iglesia"
          className="form-control"
          placeholder="Iglesia"
          value={formData.iglesia}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="comentario" className="form-label">Capitan</label>
         <input
          name="comentario"
          className="form-control"
          placeholder="capitan"
          value={formData.comentario}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Actividad realizada</label>
        <input
          name="actividad"
          className="form-control"
          placeholder="Actividad"
          value={formData.actividad}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <label className="form-label">Milagros</label>
          <input
            name="milagros"
            type="number"
            className="form-control"
            value={formData.milagros}
            onChange={handleChange}
          />
        </div>
         <div className="col-md-3 mb-3">
          <label className="form-label">Sanidades</label>
          <input
            name="sanidades"
            type="number"
            className="form-control"
            value={formData.sanidades}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Salvaciones</label>
          <input
            name="salvaciones"
            type="number"
            className="form-control"
            value={formData.salvaciones}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Ofrendas (bs.)</label>
          <input
            name="ofrendas"
            type="number"
            step="0.01"
            className="form-control"
            value={formData.ofrendas}
            onChange={handleChange}
          />
        </div>
       
      </div>
      

      <button type="submit" className="btn btn-primary">
        Enviar Reporte
      </button>
    </form>
  );
}
