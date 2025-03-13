// resources/js/pages/Register.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Se envía la petición de registro a la API de Laravel
            const response = await api.post('/register', {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation,
            });
            message.success('Registro exitoso');
            // Se guarda el token de autenticación en localStorage (si es necesario)
            localStorage.setItem('token', response.data.access_token);
            // Aquí puedes redirigir al usuario o actualizar el estado global
        } catch (error) {
            message.error('Error en el registro');
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
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
            <h2 style={{ textAlign: 'center' }}>Registro</h2>
            <Form name="register" layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                >
                    <Input placeholder="Tu nombre" />
                </Form.Item>
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
                    hasFeedback
                >
                    <Input.Password placeholder="Contraseña" />
                </Form.Item>
                <Form.Item
                    label="Confirmar Contraseña"
                    name="password_confirmation"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Por favor confirma tu contraseña' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Las contraseñas no coinciden'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirmar Contraseña" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Registrarse
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span>¿Ya tienes cuenta? </span>
                <Link to="/login">Inicia sesión</Link>
            </div>
        </motion.div>
    );
};

export default Register;
