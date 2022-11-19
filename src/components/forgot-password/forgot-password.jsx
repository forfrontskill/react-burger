import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, Redirect } from 'react-router-dom';
import React, { useCallback, useState } from "react";
import { passwordResetRequest } from "../../utils/burger-api";
import Question from "../question/question";

import styles from './forgot-password.module.css';
import { useAuth } from "../../services/auth/auth";

const ForgotPassword = () => {

    const auth = useAuth();

    const history = useHistory();

    const [form, setForm] = useState({
        email: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        passwordResetRequest(form).then(res => {
            history.replace({ pathname: '/reset-password'}, {fromForgotPassword: true})
        });
    },[form,history])

    if (auth.user.name) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    const isFormValid = form.email;

    return (
        <div className={styles.ForgotPassword}>
            <form className={styles.Form}>
                <p className={`text text_type_main-medium ${styles.Title} pb-6`}>
                    Восстановление пароля
                </p>
                <Input
                    type="email"
                    placeholder="Укажите e-mail"
                    extraClass="pb-6"
                    value={form.email}
                    name="email"
                    onChange={handleChange}
                />
                <Button
                    htmlType='submit'
                    extraClass="mb-20"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Восстановить
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

export default ForgotPassword;