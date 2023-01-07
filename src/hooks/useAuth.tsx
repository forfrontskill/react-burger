import { useContext } from 'react';
import { getUserInfo, login, logout, registeration, updateUserInfo } from '../services/actions/user';
import { AuthContext } from '../services/appContext'
import { TUserState } from '../services/reducers/user';
import { TFormLogin, TFormRegister,TUser } from '../services/types/data';
import { useDispatch,useSelector } from './hooks';


export function ProvideAuth({ children }:{children:React.ReactNode}): JSX.Element {

    const auth = useProvideAuth();

    return (<AuthContext.Provider value={auth}>
                {children}
            </AuthContext.Provider>);

};

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {

    const dispatch = useDispatch();

    const user = useSelector<TUserState>(store => store.user);

    const getUser = () => {
        dispatch(getUserInfo());
    }

    const signIn = (form: TFormLogin) => {
        dispatch(login(form));
    };

    const register = (form: TFormRegister) => {
        dispatch(registeration(form));
    }

    const updateUser = (form:TUser) => {
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