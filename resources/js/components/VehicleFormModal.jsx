import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import api from '../api';

const VehicleFormModal = ({ visible, onCancel, onSuccess, initialValues }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); 
    } else {
      form.resetFields(); 
    }
  }, [initialValues, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (initialValues) {
        await api.put(`/vehicles/${initialValues.id}`, values);
        message.success('Vehículo actualizado correctamente');
      } else {
        await api.post('/vehicles', values);
        message.success('Vehículo creado correctamente');
      }
      onSuccess(); 
    } catch (error) {
      console.error('Error:', error);
      message.error('Ocurrió un error');
    }
    setLoading(false);
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? 'Editar Vehículo' : 'Crear Vehículo'}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="plate_number"
          label="Número de Placa"
          rules={[{ required: true, message: 'Ingresa el número de placa' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Marca"
          rules={[{ required: true, message: 'Ingresa la marca' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="model"
          label="Modelo"
          rules={[{ required: true, message: 'Ingresa el modelo' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? 'Actualizar' : 'Crear'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VehicleFormModal;