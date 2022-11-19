import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useAuth } from "../../services/auth/auth";
import Question from "../question/question";

import styles from './register.module.css';

const Register = () => {

    const auth = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        auth.register(form);
    }

    if (auth.user.name) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    const isFormValid = form.email && form.password && form.name;

    return (
        <div className={styles.Register}>
            <form className={styles.Form}>
                <p className={`text text_type_main-medium ${styles.Title} pb-6`}>
                    Регистрация
                </p>
                <Input
                    type="text"
                    placeholder="Имя"
                    extraClass="pb-6"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    extraClass="pb-6"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <PasswordInput
                    extraClass="pb-6"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <Button
                    htmlType='submit'
                    extraClass="mb-20"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Зарегистрироваться
                </Button>
                <Question
                    questionText='Уже зарегистрированы?'
                    questionLinkText='Войти'
                    linkUrl='/login'
                />
            </form>
        </div>
    )
}

export default Register;