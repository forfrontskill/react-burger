import React from "react";
import PropTypes from 'prop-types';

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import KrisatlIcon from '../../images/kristal_icon.svg';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

import style from './burger-constructor.module.css';

const BurgerConstructor = ({ingredients =[], price = 12 }) => {

    return (
        <section className={style.BurgerConstructor}>

            <div className={style.Recipes}>
                {ingredients.map((burgerElement, index) => {
                    if (index === 0) {
                        
                        return <BurgerConstructorElement
                            key={burgerElement._id}
                            text={burgerElement.name}
                            price={burgerElement.price}
                            thumbnail={burgerElement.image}
                            type='top'
                        />;
                    } else if (index === (ingredients.length - 1)) {
                        return <BurgerConstructorElement
                            key={burgerElement._id}
                            text={burgerElement.name}
                            price={burgerElement.price}
                            thumbnail={burgerElement.image}
                            type='bottom'
                        />;
                    }

                    return <BurgerConstructorElement
                        key={burgerElement._id}
                        text={burgerElement.name}
                        price={burgerElement.price}
                        thumbnail={burgerElement.image}
                    />;
                })}
            </div>

            <div className={style.SubmitContainer}>
                <p className={"text text_type_digits-medium " + style.Price}>{price}</p>
                <img className={style.Image} src={KrisatlIcon} alt='Иконка символа кристалла (виртуальная валюта)'/>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array,
    price: PropTypes.number
}

export default BurgerConstructor;