import React from "react";
import { BurgerIcon, Logo, MenuIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "../menu-button/menu-button";

import style from './app-header.module.css';

const AppHeader = () => {

    return (
        <nav className={style.AppHeader}>
            <div>
                <MenuButton icon={<BurgerIcon />} text={'Конструктор'} type='active' onClick={()=>{}}/>
                <MenuButton icon={<ListIcon />} text={'Лента заказов'} type='inactive' onClick={()=>{}}/>
            </div>

            <Logo />
            <MenuButton icon={<MenuIcon />} text={'Личный кабинет'} type='inactive' onClick={()=>{}}/>
        </nav>
    )
}

export default AppHeader;
