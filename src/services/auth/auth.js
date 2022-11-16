import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';
import { getUserInfo, login, logout, registeration } from '../actions/user';
import { AuthContext } from '../appContext'


export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {

    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const getUser = () => {
        dispatch(getUserInfo());
    }

    const signIn = form => {
        dispatch(login(form));
    };

    const register = form => {
        dispatch(registeration(form));
    }

    const signOut = () => {
        dispatch(logout());
    };

    return {
        user,
        signIn,
        signOut,
        register,
        getUser
    };
}