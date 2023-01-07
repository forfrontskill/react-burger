import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback } from "react";
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { passwordResetConfirmRequest } from "../../utils/burger-api";
import Question from "../../components/question/question";


import styles from './reset-password.module.css';
import useForm from "../../hooks/useForm";


const ResetPassword = () => {

    const auth = useAuth();
    const location = useLocation<{fromForgotPassword: string}>();
    const isFromForgotPassword = !location?.state?.fromForgotPassword;

    const { form, handleChange } = useForm({
        password: '',
        token: '',
    });

    const history = useHistory();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        passwordResetConfirmRequest({
            password: form.password,
            token: form.token,
        })
        .then(res => {
            history.replace({ pathname: '/login' })
        })
    }, [form,history])

    if (auth.user.name) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    if(isFromForgotPassword) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        );
    }

    const isFormValid = form.password && form.token;

    return (
        <div className={styles.ResetPassword}>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <p className={`text text_type_main-medium ${styles.Title} pb-6`}>
                    Восстановление пароля
                </p>
                <PasswordInput
                    extraClass="pb-6"
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Введите код из письма"
                    extraClass="pb-6"
                    name='token'
                    value={form.token}
                    onChange={handleChange}
                />
                <Button
                    extraClass="mb-20"
                    htmlType='submit'
                    disabled={!isFormValid}
                >
                    Сохранить
                </Button>
                <Question
                    questionText='Вспомнили пароль?'
                    questionLinkText='Войти'
                    linkUrl='/login'
                />
            </form>
        </div>
    )
}

export default ResetPassword;