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
import Feed from "../../pages/feed/feed";
import OrderDetailedStatus from "../order-detailed-status/order-detailed-status";
import Order from "../../pages/order/order";



const App = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const isFromModal = location.state && location.state.modal;

    const isFromFeedOrderStatusModal = location.state && location.state.feedOrderStatusModal;
    const isFromProfileOrderStatusModal = location.state && location.state.profileOrderStatusModal;

    useEffect(() => {
        dispatch(getMenu());
        dispatch(getUserInfo());
    }, [dispatch])

    const handleIngredientModalClose = () => {
        history.goBack();
        dispatch({ type: CLOSE_INGREDIENT_MODAL });
    }

    const handleOrderStatusModalClose = () => {
        history.goBack();
    }

    return (
        <ProvideAuth>
            <AppHeader />
            <Switch location={
                isFromProfileOrderStatusModal
                || isFromFeedOrderStatusModal
                || isFromModal
                || location
            }>
                <Route path='/login' exact>
                    <Login />
                </Route>
                <Route path='/feed' exact>
                    <Feed />
                </Route>
                <Route path='/register' exact>
                    <Register />
                </Route>
                <Route path='/forgot-password' exact>
                    <ForgotPassword />
                </Route>
                <Route path='/reset-password' exact>
                    <ResetPassword />
                </Route>
                <Route path='/' exact>
                    <OrderConstructor />
                </Route>
                <Route path='/ingredients/:id' >
                    <IngredientDetailsPage />
                </Route>
                <Route path='/feed/:id'>
                    <Order />
                </Route>
                <ProtectedRoute path='/profile/orders/:id'>
                    <Order />
                </ProtectedRoute>
                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>
                <Route path='/404'>
                    <ErrorPage />
                </Route>
            </Switch>

            {(isFromModal) && (
                <Route path='/ingredients/:id'>
                    <Modal onClose={handleIngredientModalClose} title='Детали ингредиента'>
                        <IngredientDetails />
                    </Modal>
                </Route>
            )}

            {(isFromFeedOrderStatusModal) && (
                <Route path='/feed/:id'>
                    <Modal onClose={handleOrderStatusModalClose}>
                        <OrderDetailedStatus />
                    </Modal>
                </Route>
            )}
            {(isFromProfileOrderStatusModal) && (
                <ProtectedRoute path='/profile/orders/:id'>
                    <Modal onClose={handleOrderStatusModalClose}>
                        <OrderDetailedStatus />
                    </Modal>
                </ProtectedRoute>
            )}

        </ProvideAuth>

    )
}

export default App;