import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './api';  // <-- Importa la función

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    zona: 'zona 1',
    role: 'capitan',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(form);  // <-- Usamos la función importada

      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Error al conectar con el servidor');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registro</h3>

      <input
        name="username"
        placeholder="Usuario"
        value={form.username}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />

      <select
        name="zona"
        value={form.zona}
        onChange={handleChange}
        className="form-select mb-2"
        required
      >
        <option value="Zona 1">Zona 1</option>
        <option value="Zona 2">Zona 2</option>
        <option value="Zona 3">Zona 3</option>
        <option value="Zona 4">Zona 4</option>
        <option value="Zona 5">Zona 5</option>
      </select>

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="form-select mb-3"
        required
      >
        <option value="capitan">Capitán</option>
        <option value="superCapitan">Super Capitán</option>
      </select>

      <button className="btn btn-success" type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
