import React from "react";
import { BrowserRouter as Router, NavLink, Switch } from 'react-router-dom'
import { useAuth } from "../../services/auth/auth";
import OrderHistory from "../order-history/order-history";
import ProfileForm from "../profile-form/profile-form";
import ProtectedRoute from "../protected-route/protected-route";

import styles from './profile.module.css';

const Profile = () => {

    console.log('Render profile');

    const {signOut} = useAuth();

    const handleLogout = () => {
        signOut();
    }

    return (
        <div className={styles.Profile}>
            <div className={styles.Menu}>
                <NavLink
                    className={`text text_type_main-medium text_color_inactive ${styles.Link}`}
                    activeClassName={`text text_type_main-medium text_color_primary ${styles.LinkActive}`}
                    exact
                    to='/profile'
                >
                    Профиль
                </NavLink>
                <NavLink
                    className={`text text_type_main-medium text_color_inactive ${styles.Link}`}
                    activeClassName={`text text_type_main-medium text_color_primary ${styles.LinkActive}`}
                    exact
                    to='/profile/orders'
                >
                    История заказов
                </NavLink>
                <NavLink
                    className={`text text_type_main-medium text_color_inactive ${styles.Link}`}
                    activeClassName={`text text_type_main-medium text_color_primary ${styles.LinkActive}`}
                    exact
                    onClick={handleLogout}
                    to='/logut'
                >
                    Выход
                </NavLink>
            </div>
            <div>
                <Switch>
                    <ProtectedRoute path='/profile/orders'>
                        <OrderHistory />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile'>
                        <ProfileForm />
                    </ProtectedRoute >
                </Switch>
            </div>
        </div>
    )
}

export default Profile;