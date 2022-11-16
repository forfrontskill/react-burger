import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { passwordResetRequest } from "../../utils/burger-api";
import Question from "../question/question";

import styles from './forgot-password.module.css';

const ForgotPassword = () => {

    const [from, setFrom] = useState({
        email: '',
    });

    const handleChange = (e) => {
        setFrom({ ...from, [e.target.name]: e.target.value });
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        passwordResetRequest(from).then(res => {
            console.log('resetPAssword', res);
        });
    },[from])

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
                    value={from.email}
                    name="email"
                    onChange={handleChange}
                />
                <Button
                    htmlType='submit'
                    extraClass="mb-20"
                    onClick={handleSubmit}
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