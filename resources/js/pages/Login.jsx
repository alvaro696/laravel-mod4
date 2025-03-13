// resources/js/pages/Login.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/login', values);
      message.success('Inicio de sesión exitoso');
      localStorage.setItem('token', response.data.access_token);
      // Aquí podrías redirigir o actualizar el estado global
    } catch (error) {
      message.error('Credenciales inválidas');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff'
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor ingresa tu email' },
            { type: 'email', message: 'Ingresa un email válido' }
          ]}
        >
          <Input placeholder="usuario@ejemplo.com" />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Ingresar
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <span>¿No tienes cuenta? </span>
        <Link to="/register">Regístrate</Link>
      </div>
    </motion.div>
  );
};

export default Login;
