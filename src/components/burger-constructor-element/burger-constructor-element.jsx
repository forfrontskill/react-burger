import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-constructor-element.module.css';

const BurgerConstructorElement = ({ text, price, thumbnail, isLocked, type }) => {
    return (
        <div className={style.Container}>
            {!isLocked && <DragIcon type="primary" />}
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

BurgerConstructorElement.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    type: PropTypes.string
}

export default BurgerConstructorElement;