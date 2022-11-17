import React, { useEffect, useState } from "react";

import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../../services/auth/auth";


const ProtectedRoute = ({ children, ...rest }) => {

    // const [isUserLoaded, setUserLoaded] = useState(false);
    const { user, getUser } = useAuth();

    // const init = () => {
    //      getUser();
    //      setUserLoaded(true);
    // }

    // useEffect(()=>{
    //     init();   
    // },[user.name]);

    console.log('userName:',user.name);

    // if (!isUserLoaded) {
    //     console.log('Protected route: Return null ');
    //     return null;
    // }

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