// src/components/MenuList.jsx
import React from "react";
import { Menu } from "antd";
import {
  BarsOutlined,
  HomeOutlined,
  LineChartOutlined,
  PieChartTwoTone,
  EnvironmentFilled,
  DashboardOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MenuList = ({ darkTheme }) => {
  const { user } = useAuth();

  // Función auxiliar para verificar si el usuario tiene un permiso
  const hasPermission = (perm) =>
    user?.permissions?.map((p) => p.toLowerCase()).includes(perm.toLowerCase());

  // Elementos estáticos que siempre se muestran
  const staticItems = [
    { key: "home", icon: <HomeOutlined />, link: "/", label: "Home" },
    { key: "progress", icon: <PieChartTwoTone />, link: "/progress", label: "Progreso" },
    { key: "payment", icon: <EnvironmentFilled />, link: "/payment", label: "Pago" },
  ];

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
    >
      {staticItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.link}>{item.label}</Link>
        </Menu.Item>
      ))}

      {hasPermission("view_activity") && (
        <Menu.Item key="activity" icon={<LineChartOutlined />}>
          <Link to="/activity">Actividad</Link>
        </Menu.Item>
      )}

      {hasPermission("view_panel") && (
        <Menu.SubMenu
          key="administracion"
          icon={<DashboardOutlined />}
          title="Administración"
        >
          <Menu.Item key="admin" icon={<UsergroupDeleteOutlined />}>
            <Link to="/admin">Usuarios</Link>
          </Menu.Item>
          <Menu.Item key="role-management" icon={<UserSwitchOutlined />}>
            <Link to="/role-management">Roles</Link>
          </Menu.Item>
          <Menu.Item key="permission-management" icon={<BarsOutlined />}>
            <Link to="/permission-management">Permisos</Link>
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export default MenuList;