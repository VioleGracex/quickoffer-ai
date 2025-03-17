import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ element: Component, ...rest }: any) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;