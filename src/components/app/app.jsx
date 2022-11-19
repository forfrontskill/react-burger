import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useLocation } from 'react-router-dom';

import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Content from '../../components/content/content';
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../services/actions/menu";
import ProtectedRoute from "../protected-route/protected-route";
import ForgotPassword from "../forgot-password/forgot-password";
import Register from "../register/register";
import Login from "../login/login";
import ResetPassword from "../reset-password/reset-password";
import Profile from "../profile/profile";
import { ProvideAuth } from "../../services/auth/auth";
import { getUserInfo } from "../../services/actions/user";
import ErrorPage from "../error-page/error-page";
import IngredientDetailsPage from "../ingrdient-details-page/ingrdient-details-page";



const App = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const isFromModal = !location?.state?.fromModal;
    const isFromForgotPassword = !location?.state?.fromForgotPassword;

    const { itemsRequest, itemsRequestFailed, itemsRequestFailedMessage } = useSelector(store => store.menu);

    useEffect(() => {
        dispatch(getMenu());
        dispatch(getUserInfo());
    }, [dispatch])


    return (
        <ProvideAuth>
            <AppHeader />
            <Switch>
                <Route path='/login' exact={true}>
                    <Login />
                </Route>
                <Route path='/register' exact={true}>
                    <Register />
                </Route>
                <Route path='/forgot-password' exact={true}>
                    <ForgotPassword />
                </Route>
                {!isFromForgotPassword && (
                    <Route path='/reset-password' exact={true}>
                    <ResetPassword />
                </Route>
                )}
                {isFromModal && (
                    <ProtectedRoute path='/ingredients/:id' exact={true} >
                        <IngredientDetailsPage />
                    </ProtectedRoute>
                )}
                <ProtectedRoute path={['/','/ingredients/:id']} exact={true}>
                    <Content>
                        {itemsRequest ? (
                            <p>ЗАГРУЗКА....</p>
                        ) : (
                            <>
                                {itemsRequestFailed ? (
                                    <p>{itemsRequestFailedMessage}</p>
                                ) : (
                                    <DndProvider backend={HTML5Backend}>
                                        <BurgerIngredients />
                                        <BurgerConstructor />
                                    </DndProvider>
                                )}
                            </>
                        )}
                    </Content>
                </ProtectedRoute>
                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>
                <Route path='/404' exact={true}>
                    <ErrorPage />
                </Route>
            </Switch>
        </ProvideAuth>

    )
}

export default App;