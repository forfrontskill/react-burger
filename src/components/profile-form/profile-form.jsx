import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/auth/auth';

import styles from './profile-form.module.css';


const ProfileForm = () => {

    const {user, updateUser } = useAuth();

    const [form, setForm] = useState({name:'', email:'', password:'', isChanged: false});

    useEffect(()=>{
        setForm({...form, name: user.name, email: user.email, password: user.password});
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value, isChanged: true });
    }

    const handleSave = (e) => {
        e.preventDefault();
        updateUser(form);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setForm({...form, name: user.name, email: user.email, password: user.password, isChanged: false});
    }


    return (
        <form>
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
                <Button htmlType='submit' onClick={handleSave}>Сохранить</Button>
                <Button htmlType='button' type='secondary' onClick={handleCancel}>Отменить</Button>
            </div>
            )}
            
        </form>
    )
}

export default ProfileForm;