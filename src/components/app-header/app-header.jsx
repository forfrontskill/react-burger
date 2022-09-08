import React from "react";
import { BurgerIcon, Logo, MenuIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "../menu-button/menu-button";

import style from './app-header.module.css';

const AppHeader = () => {

    return (
        <nav className={style.AppHeader}>
            <div>
                <MenuButton icon={<BurgerIcon />} text={'Конструктор'} type='active'/>
                <MenuButton icon={<ListIcon />} text={'Лента заказов'} type='inactive'/>
            </div>

            <Logo />
            <MenuButton icon={<MenuIcon />} text={'Личный кабинет'} type='inactive'/>
        </nav>
    )
}

export default AppHeader;
