import React, { useState, useEffect } from 'react';
import api from '../api';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import VehicleFormModal from '../components/VehicleFormModal';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleCreate = () => {
    setSelectedVehicle(null);
    setModalVisible(true);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalVisible(true);
  };

  const handleModalSuccess = () => {
    setModalVisible(false);
    fetchVehicles();
  };

  const columns = [
    {
      title: 'Placa',
      dataIndex: 'plate_number',
      key: 'plate_number',
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Modelo',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            style={{ backgroundColor: '#FFC107', border: 'none', color: '#fff' }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar este vehículo?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ backgroundColor: '#FF4D4F', border: 'none', color: '#fff' }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Vehículos</h1>
      <Button type="primary" onClick={handleCreate}>
        Crear Vehículo
      </Button>
      <Table dataSource={vehicles} columns={columns} rowKey="id" />

      <VehicleFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={handleModalSuccess}
        initialValues={selectedVehicle}
      />
    </div>
  );
};

export default VehicleList;
