import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { useHistory, Redirect } from 'react-router-dom';
import { useAuth } from "../../services/auth/auth";
import { passwordResetConfirmRequest } from "../../utils/burger-api";
import Question from "../question/question";

import styles from './reset-password.module.css';


const ResetPassword = () => {

    const auth = useAuth();

    const history = useHistory();

    const [form, setForm] = useState({
        password: '',
        token: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        passwordResetConfirmRequest(form)
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

    const isFormValid = form.password && form.token;

    return (
        <div className={styles.ResetPassword}>
            <form className={styles.Form}>
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
                    onClick={handleSubmit}
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