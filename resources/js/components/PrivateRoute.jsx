// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.auth);

  // Si no hay token, redirige al login
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;