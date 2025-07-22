import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReportForm from './ReportForm';
import ReportList from './ReportList';
import Totales from './Totales';
// import ReportEdit from './ReportEdit';
import Login from './login';
import Register from './register';
import Navbar from './navbar';
import { AuthProvider, useAuth } from './auth';
import 'bootstrap/dist/css/bootstrap.min.css';

// Ruta protegida
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ReportForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/reportes"
              element={
                <PrivateRoute>
                  <ReportList />
                </PrivateRoute>
              }
            />
            <Route
              path="/totales"
              element={
                <PrivateRoute>
                  <Totales />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/update/:id"
              element={
                <PrivateRoute>
                  <ReportEdit />
                </PrivateRoute>
              }
            /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
