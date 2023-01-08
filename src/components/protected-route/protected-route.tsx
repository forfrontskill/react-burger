import React from "react";
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

type TProtectedRoute = RouteProps & {children?: React.ReactNode};

const ProtectedRoute = ({ children, ...rest }: TProtectedRoute) => {

  const { user } = useAuth();

  if (user.isAuthNeed) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );

}

export default ProtectedRoute;