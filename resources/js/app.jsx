import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import PrivateRoute from './components/PrivateRoute';
import Inicio from './pages/Inicio';
import "antd/dist/reset.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Inicio />} />
              <Route path="perfil" element={<Perfil />} />
            </Route>
          </Route>
          {/* Ruta por defecto redirige al Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
