import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { passwordResetConfirmRequest } from "../../utils/burger-api";
import Question from "../question/question";

import styles from './reset-password.module.css';


const ResetPassword = () => {

    const [from, setFrom] = useState({
        password: '',
        token: '',
    });

    const handleChange = (e) => {
        setFrom({ ...from, [e.target.name]: e.target.value });
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        passwordResetConfirmRequest(from)
        .then(res => {
            console.log('ResetConfirm', res);
        })
    }, [from])



    return (
        <div className={styles.ResetPassword}>
            <form className={styles.Form}>
                <p className={`text text_type_main-medium ${styles.Title} pb-6`}>
                    Восстановление пароля
                </p>
                <PasswordInput
                    extraClass="pb-6"
                    name='password'
                    value={from.password}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Введите код из письма"
                    extraClass="pb-6"
                    name='token'
                    value={from.token}
                    onChange={handleChange}
                />
                <Button
                    extraClass="mb-20"
                    htmlType='submit'
                    onClick={handleSubmit}
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