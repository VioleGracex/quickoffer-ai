import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []); // Empty dependency array ensures this runs only once on mount

  return !isAuthenticated ? <Outlet /> : <Navigate to="/main-dashboard" />;
};

export default PublicRoute;
