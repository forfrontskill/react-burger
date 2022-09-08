import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-constructor-element.module.css';

const BurgerConstructorElement = ({text,price,thumbnail,isLocked=true,type}) => {
    return (
        <div className={style.Container}>
            <DragIcon type="primary" />
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </div>
    )
};

export default BurgerConstructorElement;