import React from "react";
import PropTypes from 'prop-types';

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-ingredient.module.css';
import { IngredientType } from "../../utils/objects";

const BurgerIngredient = ({ingredient, onClick}) => {
    const {image, price, count, name,} = ingredient;
    return (
        <div className={style.BurgerIngredient} onClick={onClick(ingredient)}>
            <img className={style.Image} src={image} alt='Изображение ингредиента'/>
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
    ingredient: IngredientType.isRequired,
    onClick: PropTypes.func.isRequired
}

export default BurgerIngredient;