import React, { FC } from "react";
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

type TProtectedRoute = {
  path: string;
  exact?: boolean;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {

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