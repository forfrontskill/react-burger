import React from "react";
import { NavLink, Switch } from 'react-router-dom'
import { useAuth } from "../../hooks/useAuth";
import OrderHistory from "../../components/order-history/order-history";
import ProfileForm from "../../components/profile-form/profile-form";
import ProtectedRoute from "../../components/protected-route/protected-route";

import styles from './profile.module.css';

const Profile = () => {

    const { signOut } = useAuth();

    const handleLogout = () => {
        signOut();
    }

    return (
        <div className={styles.Content}>
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
                    <p
                        className={`text text_type_main-medium text_color_inactive ${styles.Link}`}
                        onClick={handleLogout}
                    >
                        Выход
                    </p>
                    <span className={`text text_type_main-default text_color_inactive ${styles.Info}`}>
                        В этом разделе вы можете
                        изменить свои персональные данные</span>
                </div>
                <div>
                    <Switch>
                        <ProtectedRoute path='/profile' exact>
                            <ProfileForm />
                        </ProtectedRoute >
                        <ProtectedRoute path='/profile/orders' exact>
                            <OrderHistory />
                        </ProtectedRoute>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Profile;