import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../routes/useAuth';

const PrivateRoute = () => {
  const { fetchUserDetails } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetchUserDetails(token);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;