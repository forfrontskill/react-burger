import React from "react";
import { BurgerIcon, Logo, MenuIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "../menu-button/menu-button";

import style from './app-header.module.css';

const AppHeader = () => {

    return (
        <nav className={style.AppHeader}>
            <div>
                <MenuButton icon={<BurgerIcon />} text={'Конструктор'}/>
                <MenuButton icon={<ListIcon />} text={'Лента заказов'}/>
            </div>

            <Logo />
            <MenuButton icon={<MenuIcon />} text={'Личный кабинет'}/>
        </nav>
    )
}

export default AppHeader;
