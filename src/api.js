// src/api.js
const API_URL = 'http://localhost:8000'; // Asegúrate que esto coincida con tu backend

export async function createReport(data) {
  const response = await fetch(`${API_URL}/api/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getReports() {
  const response = await fetch(`${API_URL}/api/reports`);
  return response.json();
}

export const getTotales = async (zona = 'Todas', desde = '', hasta = '') => {
  const params = new URLSearchParams();

  if (zona && zona !== 'Todas') params.append('zona', zona);
  if (desde) params.append('desde', desde);
  if (hasta) params.append('hasta', hasta);

  try {
    const response = await fetch(`${API_URL}/api/reports/totales?${params.toString()}`);
    const text = await response.text();

    if (!text) return { milagros: 0, salvaciones: 0, sanidades: 0, ofrendas: 0 };

    return JSON.parse(text);
  } catch (err) {
    console.error('Error al obtener totales:', err);
    return { milagros: 0, salvaciones: 0, sanidades: 0, ofrendas: 0 };
  }
};

// --- Login
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const text = await res.text();

  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(data.error || 'Error en login');
    }
    return data;
  } catch (error) {
    throw new Error('Respuesta inválida del servidor');
  }
}

// --- Register
export async function registerUser(credentials) {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const text = await res.text();

  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(data.error || 'Error en registro');
    }
    return data;
  } catch (error) {
    throw new Error('Respuesta inválida del servidor');
  }
}