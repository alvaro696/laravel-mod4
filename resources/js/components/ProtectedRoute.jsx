// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles, allowedPermissions }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  // Verificar por rol si se especifican roles permitidos
  if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Verificar por permisos si se especifican
  if (
    allowedPermissions &&
    (!user.permissions ||
      !allowedPermissions.every((perm) =>
        user.permissions.map((p) => p.toLowerCase()).includes(perm.toLowerCase())
      ))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;