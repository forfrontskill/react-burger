import React, { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { BurgerIcon, Logo, MenuIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "../menu-button/menu-button";

import style from './app-header.module.css';

const AppHeader = () => {

    const history = useHistory();

    const handleProfile = useCallback(
        () => {
            history.push({ pathname: '/profile' });
        },
        [history]
      ); 

    return (
        <header className={style.AppHeader}>
            <nav className={style.Menu}>
                <div>
                    <MenuButton icon={<BurgerIcon />} text={'Конструктор'} type='active' onClick={() => { }} />
                    <MenuButton icon={<ListIcon />} text={'Лента заказов'} type='inactive' onClick={() => { }} />
                </div>

                <Logo />
                <MenuButton icon={<MenuIcon />} text={'Личный кабинет'} type='inactive' onClick={(e) => {
                    e.preventDefault();
                    handleProfile()}} />
            </nav>
        </header>
    )
}

export default AppHeader;
