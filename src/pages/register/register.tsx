import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FormEvent } from "react";
import { Redirect } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import Question from "../../components/question/question";

import styles from './register.module.css';
import useForm from "../../hooks/useForm";

const Register = () => {

    const auth = useAuth();

    const { form, handleChange } = useForm({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        auth.register({
            name: form.name,
            email: form.email,
            password: form.password,
        });
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
            <form className={styles.Form} onSubmit={handleSubmit} >
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