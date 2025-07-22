import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { loginUser } from './api';  // <-- Importar la función

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form); // <-- Usamos la función importada

      // Guardamos el token o datos del usuario que venga en `data`
      auth.login(data.user);
      navigate('/');
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Iniciar Sesión</h3>
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
      <button className="btn btn-primary" type="submit">Entrar</button>
    </form>
  );
}

export default Login;
