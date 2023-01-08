import React from "react";
import { TFormLogin, TFormRegister, TUser } from "./types/data";

export type TAuthContext = {
    user: TUser;
    signIn: (form: TFormLogin) => void;
    signOut: () => void;
    register: (form: TFormRegister) => void;
    getUser: () => void;
    updateUser: (form: TUser) => void;
}

const initialAuthContext: TAuthContext = {
    user: {
        name:'',
        email:'',
        password:'',
    },
    signIn: (form) => {},
    signOut: () => {},
    register: (form) => {},
    getUser: () => {},
    updateUser: (form) => {},
};

export const IngredientsContext = React.createContext(undefined);
export const AuthContext = React.createContext<TAuthContext>(initialAuthContext);