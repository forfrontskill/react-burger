import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { SyntheticEvent, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';

import styles from './profile-form.module.css';


const ProfileForm = () => {

    const { user, updateUser } = useAuth();
    const { form, setForm } = useForm({ name: '', email: '', password: '', isChanged: false });

    useEffect(() => {
        setForm({ ...form, name: user.name, email: user.email, password: user.password });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value, isChanged: true });
    }

    const handleSave = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUser({
            name: form.name,
            email: form.email,
            password: form.password,
        });
    }

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setForm({ ...form, name: user.name, email: user.email, password: user.password, isChanged: false });
    }

    const isFormValid = form.name && form.email && form.password;

    return (
        <form onSubmit={handleSave}>
            <Input
                type='text'
                placeholder='Имя'
                icon='EditIcon'
                extraClass='mb-6'
                value={form.name}
                name='name'
                onChange={handleChange}
            />
            <Input
                type='text'
                placeholder='Логин'
                icon='EditIcon'
                extraClass='mb-6'
                value={form.email}
                name='email'
                onChange={handleChange}
            />
            <PasswordInput
                value={form.password || ''}
                name='password'
                onChange={handleChange}
            />
            {form.isChanged && (
                <div className={styles.ButtonGroup}>
                    <Button htmlType='submit' disabled={!isFormValid}>Сохранить</Button>
                    <Button htmlType='button' type='secondary' onClick={handleCancel}>Отменить</Button>
                </div>
            )}

        </form>
    )
}

export default ProfileForm;