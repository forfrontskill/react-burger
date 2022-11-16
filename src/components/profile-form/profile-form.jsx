import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';

import styles from './profile-form.module.css';


const ProfileForm = () => {

    const user = useSelector(store => store.user);


    return (
        <>
            <Input
                type='text'
                placeholder='Имя'
                icon='EditIcon'
                extraClass='mb-6'
                value={user.name}
            />
            <Input
                type='text'
                placeholder='Логин'
                icon='EditIcon'
                extraClass='mb-6'
                value={user.email}
            />
            <PasswordInput
                value={user.password}
            />
        </>
    )
}

export default ProfileForm;