
import React, { useCallback } from "react";
import { Redirect, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import Question from "../../components/question/question";

import styles from './login.module.css';
import { useAuth } from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

const Login = () => {
    const auth = useAuth();
    const location = useLocation<{ from: string }>();


    const { form, handleChange } = useForm({ email: '', password: '' });

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        auth.signIn({ email: form.email, password: form.password });
    }, [form, auth])

    if (auth.user.name) {
        return (
            <Redirect
                to={location?.state?.from || '/'}
            />
        );
    }

    const isFormValid = form.email && form.password;

    return (
        <div className={styles.Login}>
            <form className={styles.Form} onSubmit={handleSubmit}>
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
                    disabled={!isFormValid}
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