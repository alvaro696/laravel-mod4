import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { clearCredentials } from '../store/authSlice';
import UserDropdown from '../components/UserDropdown';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const { token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ padding: '16px', color: '#fff', textAlign: 'center' }}>
          <h2>Dashboard</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/dashboard/perfil">Perfil</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/dashboard/vehicles">Vehiculos</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', textAlign: 'right' }}>
          <UserDropdown email={email} onLogout={handleLogout} />
        </Header>

        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;