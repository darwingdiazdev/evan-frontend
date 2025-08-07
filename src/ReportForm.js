import { useState } from 'react';
import Swal from 'sweetalert2';
import { createReport } from './api';


const pastorsByZone = {
  'zona 1': [
    'Baudilio Parra ',
    'Bernardo Contreras ',
    'Daritza de Colmenares ',
    'Dixon Alcantara ',
    'Edilia de Méndez ',
    'Edilio Quintero',
    'Gerardo Vera ',
    'Gisela Barrios ',
    'Hilario Rivas',
    'Jesús Márquez ',
    'Junior Colmenares ',
    'Leonardo Nava ',
    'Liliana Guillén ',
    'Lizeth de Araque ',
    'Luis Rivero',
    'Manuel Monsalve ',
    'Ygor López ',
    'Yolanda de Martínez ',
  ],
  'zona 2': [
    'Ali Dávila',
    'Argenis Silva',
    'Asleyda Silva',
    'Belkis Lobo',
    'Ever Oliveros',
    'Giovanny Chourio ',
    'Giovanny Chourio ',
    'Héctor Rivero',
    'Jesús Contreras',
    'Leonardo Mesino',
    'Olinto Machado',
    'Sandra de Flores',
  ],
  'zona 3': [
    'Boanerges',
    'Cristian Villamizar',
    'Deveis Chourio',
    'Glenis San Martin',
    'Heidy Soto',
    'Hilba Castro',
    'Jonas Mendoza',
    'Leonardo Chourio',
    'Leyva Meza',
    'María Luisa Acevedo',
    'Martha Quiñónez',
    'Teresa López',
    'Yimy Puentes',
    'Yofraces Rondón',
    'Ysmelda Vargas',
  ],
  'zona 4': [
    'Alexander Cabrera ',
    'Alexander Guerra y Johan Aldana ',
    'Carlos López ',
    'Daniel Rangel ',
    'Eivar Linares ',
    'Wiilbrainer Linares y Modesto Cárdenas ',
    'Ennis Pirela ',
    'Isaías Rico ',
    'Javier Luque ',
    'José Pirona ',
    'José Vázquez ',
    'Juan Briceño ',
    'Orlando Uviedo - Fundacion  ',
    'Orlando Uviedo - Fortalecimiento ',
    'Rigoberto Díaz y Danilo ',
    'Roger Moreno ',
    'Víctor Castellanos',
  ],
  'zona 5': [
    'Alexander Mateus ',
    'Álvaro Silva',
    'David Uribe ',
    'Enmanuel Terán ',
    'Enmanuel Vargas ',
    'Gonzalo Pérez ',
    'Jhon Herrera ',
    'José Marquina ',
    'Nubia Gamboa ',
    'Pedro Montiel ',
    'Ronald Buitrago ',
  ],
};

export default function ReportForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    region: '',
    iglesia: '',
    actividad: 'Evangelismo',
    evangelizados: 0,
    sanidades: 0,
    reconciliados: 0,
    kids: 0,
    house: 0,
    trate: 0,
    convertidos: 0,
    discipulados: 0,
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
      const res =  await createReport(formData);
       Swal.fire({
        icon: 'success',
        title: '¡Reporte enviado!',
        text: 'El reporte fue registrado exitosamente.',
        confirmButtonText: 'Aceptar',
      });
      setFormData({
        region: '',
        iglesia: '',
        actividad: 'Evangelismo',
        evangelizados: 0,
        sanidades: 0,
        reconciliados: 0,
        kids: 0,
        house: 0,
        trate: 0,
        convertidos: 0,
        discipulados: 0,
        ofrendas: 0,
        comentario: '',
      });
      onSuccess?.();
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
        "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas."
        Josue 1:9
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
          <option value="zona 1">Zona 1</option>
          <option value="zona 2">Zona 2</option>
          <option value="zona 3">Zona 3</option>
          <option value="zona 4">Zona 4</option>
          <option value="zona 5">Zona 5</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="pastor" className="form-label">Pastor</label>
        <select
          id="pastor"
          name="iglesia"
          value={formData.iglesia}
          onChange={handleChange}
          className="form-select"
          required
          disabled={!formData.region}
        >
          <option value="">Seleccione un pastor</option>
          {pastorsByZone[formData.region]?.map((pastor, index) => (
            <option key={index} value={pastor}>
              {pastor}
            </option>
          ))}
        </select>
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
          placeholder="Evangelismo"
          value={formData.actividad}
          onChange={handleChange}
          disabled
          required
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Evangelizados</label>
          <input
            name="evangelizados"
            type="number"
            className="form-control"
            value={formData.evangelizados}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Convertidos</label>
          <input
            name="convertidos"
            type="number"
            className="form-control"
            value={formData.convertidos}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Reconciliados</label>
          <input
            name="reconciliados"
            type="number"
            className="form-control"
            value={formData.reconciliados}
            onChange={handleChange}
          />
        </div>
         <div className="col-md-4 mb-3">
          <label className="form-label">Discipulados</label>
          <input
            name="discipulados"
            type="number"
            className="form-control"
            value={formData.discipulados}
            onChange={handleChange}
          />
        </div>
          <div className="col-md-4 mb-3">
          <label className="form-label">Niños evangelizados</label>
          <input
            name="kids"
            type="number"
            className="form-control"
            value={formData.kids}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Casas visitadas</label>
          <input
            name="house"
            type="number"
            className="form-control"
            value={formData.house}
            onChange={handleChange}
          />
        </div>
         <div className="col-md-4 mb-3">
          <label className="form-label">Tratados entregados</label>
          <input
            name="trate"
            type="number"
            className="form-control"
            value={formData.trate}
            onChange={handleChange}
          />
        </div>
        
         <div className="col-md-4 mb-3">
          <label className="form-label">Sanidades y Milagros</label>
          <input
            name="sanidades"
            type="number"
            className="form-control"
            value={formData.sanidades}
            onChange={handleChange}
          />
        </div>
        
        <div className="col-md-4 mb-3">
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
