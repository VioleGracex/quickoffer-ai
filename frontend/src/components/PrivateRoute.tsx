import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/main-dashboard" /> : <Outlet />;
}