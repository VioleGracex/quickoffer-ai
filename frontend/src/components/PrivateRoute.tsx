import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export function PublicRoute() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to="/main-dashboard" /> : <Outlet />;
}