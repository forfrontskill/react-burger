import React from "react";
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";


const ProtectedRoute = ({ children, ...rest }) => {

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

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProtectedRoute;