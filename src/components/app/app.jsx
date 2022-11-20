import React, { useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import AppHeader from '../../components/app-header/app-header';
import { useDispatch } from "react-redux";
import { CLOSE_INGREDIENT_MODAL, getMenu } from "../../services/actions/menu";
import ProtectedRoute from "../protected-route/protected-route";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { ProvideAuth } from "../../hooks/useAuth";
import { getUserInfo } from "../../services/actions/user";
import ErrorPage from "../../pages/error-page/error-page";
import IngredientDetailsPage from "../ingrdient-details-page/ingrdient-details-page";
import OrderConstructor from "../../pages/order-constructor/order-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";



const App = () => {

    const dispatch = useDispatch();
    let location = useLocation();
    const history = useHistory();

    let isFromModal = location.state && location.state.modal;


    useEffect(() => {
        dispatch(getMenu());
        dispatch(getUserInfo());
    }, [dispatch])

    const handleModalClose = (e) => {
        e.stopPropagation();
        history.goBack();
        dispatch({ type: CLOSE_INGREDIENT_MODAL });
    }

    return (
        <ProvideAuth>
            <AppHeader />
            <Switch location={isFromModal || location}>
                <Route path='/login' exact={true}>
                    <Login />
                </Route>
                <Route path='/register' exact={true}>
                    <Register />
                </Route>
                <Route path='/forgot-password' exact={true}>
                    <ForgotPassword />
                </Route>
                    <Route path='/reset-password' exact={true}>
                        <ResetPassword />
                    </Route>
                <Route path='/' exact>
                    <OrderConstructor />
                </Route>
                <Route path='/ingredients/:id' >
                    <IngredientDetailsPage />
                </Route>
                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>
                <Route path='/404'>
                    <ErrorPage />
                </Route>
            </Switch>
            
            {(isFromModal) && (
                <Route path='/ingredients/:id'>
                    <Modal onClose={handleModalClose} title='Детали ингредиента'>
                            <IngredientDetails />
                        </Modal>
                </Route>
            )}
        </ProvideAuth>

    )
}

export default App;