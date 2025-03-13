import React from 'react';
import { Dropdown, Menu, Button, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'; 

const UserDropdown = ({ email, onLogout }) => {

  const menu = (
    <Menu>
      <Menu.Item key="email" disabled>
        {email}
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button type="text" style={{ padding: '0' }}>
        <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} /> 
        {email} 
      </Button>
    </Dropdown>
  );
};

export default UserDropdown;