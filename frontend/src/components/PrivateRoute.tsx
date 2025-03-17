import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import useAuth from '../routes/auth_api';

const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenValidity = isTokenValid(token);
      setIsAuthenticated(tokenValidity);
    } else {
      setIsAuthenticated(false);
      signOut();
    }
  }, []);

  if (isAuthenticated === null) {
    // Render a loading state while authentication is being checked
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

const isTokenValid = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export default PrivateRoute;