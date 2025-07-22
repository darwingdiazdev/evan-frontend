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

export const getTotales = async (zona, desde, hasta) => {
  const response = await fetch(`${API_URL}/api/reports/totales?zona=${zona}&desde=${desde}&hasta=${hasta}`);

  // Si la respuesta no es JSON válida, esto previene el error
  const text = await response.text();
  if (!text) return { milagros: 0, salvaciones: 0, sanidades: 0, ofrendas: 0 };

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Error al parsear JSON:', err);
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