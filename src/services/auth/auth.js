import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, login, logout, registeration, updateUserInfo } from '../actions/user';
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

    const updateUser = form => {
        dispatch(updateUserInfo(form));
    }

    const signOut = () => {
        dispatch(logout());
    };

    return {
        user,
        signIn,
        signOut,
        register,
        getUser,
        updateUser
    };
}