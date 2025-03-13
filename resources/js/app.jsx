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
import VehicleList from './pages/VehicleList';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const clientId = '907944692239-5q2hl89uj7ht4s3f502js4aokvka6brm.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Inicio />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="vehicles" element={<VehicleList />} />
              </Route>
            </Route>
            {/* Ruta por defecto redirige al Login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
