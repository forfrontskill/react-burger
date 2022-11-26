import React, { useCallback } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { BurgerIcon, Logo, MenuIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "../menu-button/menu-button";

import style from './app-header.module.css';

const PATH_PROFILE = '/profile';
const PATH_BASE = '/';
const PATH_INGREDIENTS = '/ingredients/';
const PATH_FEED = '/feed';

const AppHeader = () => {

    const history = useHistory();
    const { pathname } = useLocation();

    const isProfile = pathname.includes(PATH_PROFILE) ? 'active' : 'inactive';
    const isConstuctor = pathname === PATH_BASE || pathname.includes(PATH_INGREDIENTS) ? 'active' : 'inactive';

    const handleProfile = useCallback(
        (e) => {
            e.preventDefault();
            history.push({ pathname: PATH_PROFILE });
        },
        [history]
    );

    const handleForwardMainPage = useCallback(
        (e) => {
            e.preventDefault();
            history.push({ pathname: PATH_BASE });
        },
        [history]
    );

    const handleFeedPage = useCallback(
        (e) => {
            e.preventDefault();
            history.push({ pathname: PATH_FEED });
        },
        [history]
    );

    return (
        <header className={style.AppHeader}>
            <nav className={style.Menu}>
                <div>
                    <MenuButton icon={<BurgerIcon />} text={'Конструктор'} type={isConstuctor} onClick={handleForwardMainPage} />
                    <MenuButton icon={<ListIcon />} text={'Лента заказов'} type='inactive' onClick={handleFeedPage} />
                </div>
                <div className={style.Logo} onClick={handleForwardMainPage}>
                    <Logo />
                </div>
                <MenuButton icon={<MenuIcon />} text={'Личный кабинет'} type={isProfile} onClick={handleProfile} />
            </nav>
        </header>
    )
}

export default AppHeader;
