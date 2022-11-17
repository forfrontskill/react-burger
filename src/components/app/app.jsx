import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
import { ProvideAuth, useAuth } from "../../services/auth/auth";
import { getUserInfo, GET_USER_RQUEST } from "../../services/actions/user";


const App = () => {

    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const { itemsRequest, itemsRequestFailed, itemsRequestFailedMessage } = useSelector(store => store.menu);

    useEffect(() => {
        dispatch(getMenu());
        dispatch(getUserInfo());
    }, [dispatch])


    return (
        <ProvideAuth>
            <Router>
                <AppHeader />
                <Switch>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    {user.name ? (
                        <>
                            <ProtectedRoute path='/' exact={true}>
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
                            <ProtectedRoute path='/register' exact={true}>
                                <Register />
                            </ProtectedRoute>
                            <ProtectedRoute path='/forgot-password' exact={true}>
                                <ForgotPassword />
                            </ProtectedRoute>
                            <ProtectedRoute path='/reset-password' exact={true}>
                                <ResetPassword />
                            </ProtectedRoute>
                            <ProtectedRoute path='/profile' exact={true}>
                                <Profile />
                            </ProtectedRoute>
                        </>
                    ) : (
                        <>
                            LOADER
                        </>
                    )}
                </Switch>
            </Router>
        </ProvideAuth>

    )
}

export default App;