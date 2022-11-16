
import React, { useCallback, useState } from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import Question from "../question/question";

import styles from './login.module.css';
import { useAuth } from "../../services/auth/auth";

const Login = () => {
    const auth = useAuth();

    console.log(auth);

    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({...form, [name]:value})
    }

    const handleSubmit = useCallback( e =>{
        e.preventDefault();
        auth.signIn(form);
    },[form, auth])

    return (
        <div className={styles.Login}>
            <form className={styles.Form}>
                <p className={`text text_type_main-medium ${styles.Title} pb-6`}>
                    Вход
                </p>
                <Input
                    type="email"
                    placeholder="E-mail"
                    extraClass="pb-6"
                    value={form.email}
                    name='email'
                    onChange={handleChange}
                />
                <PasswordInput
                    extraClass="pb-6"
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                />
                <Button
                    htmlType='submit'
                    extraClass="mb-20"
                    onClick={handleSubmit}
                >
                    Войти
                </Button>
                <Question
                    questionText='Вы — новый пользователь?'
                    questionLinkText='Зарегистрироваться'
                    linkUrl='/register'
                />
                <Question
                    questionText='Забыли пароль?'
                    questionLinkText='Восстановить пароль'
                    linkUrl='/forgot-password'
                />
            </form>
        </div>
    );
}

export default Login;