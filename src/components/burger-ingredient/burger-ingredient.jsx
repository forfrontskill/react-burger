import React from "react";
import PropTypes from 'prop-types';

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-ingredient.module.css';

const BurgerIngredient = ({ingredient, onClick}) => {
    const {image, price, count, name,} = ingredient;
    return (
        <div className={style.BurgerIngredient} onClick={onClick(ingredient)}>
            <img className={style.Image} src={image}/>
            <span className={'text text_type_digits-default ' + style.Price}>
                    {price}
                    <CurrencyIcon type="primary"/>
            </span>
            <p className={'text text_type_main-small ' + style.Name}>{name}</p>
            {count && <Counter count={count} size="default" />}
        </div>
    )
}

BurgerIngredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
    name: PropTypes.string.isRequired
}

export default BurgerIngredient;