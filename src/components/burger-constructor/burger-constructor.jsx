import React, { useMemo, useState } from "react";
import PropTypes from 'prop-types';

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import KrisatlIcon from '../../images/kristal_icon.svg';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import { IngredientType } from "../../utils/objects";

const BurgerConstructor = ({ ingredients, price = 0 }) => {

    const [isOpenModal, setOpenModal] = useState(false);

    const handelCreateOrder = () => {
        setOpenModal(true);
    }

    const handleCloseOrderModal = () => {
        setOpenModal(false);
    }

    const ingredientWithoutBuns = useMemo(() => ingredients.filter((ingredient) => ingredient.type !== 'bun'), [ingredients]);
    const bun = useMemo(() => ingredients.find((ingredient) => ingredient.type === 'bun'), [ingredients]);

    return (
        <section className={style.BurgerConstructor}>
            {bun && (
                <div className={style.RecipeFix}>
                    <BurgerConstructorElement
                        key={bun._id + 'top'}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                        isLocked={true}
                        type='top'
                    />
                </div>
            )}
            <div className={style.Recipes}>
                {ingredientWithoutBuns.map((burgerElement) => {
                    return <BurgerConstructorElement
                        key={burgerElement._id}
                        text={burgerElement.name}
                        price={burgerElement.price}
                        thumbnail={burgerElement.image}
                        isLocked={false}
                    />;
                })}
            </div>
            {bun && (
                <div className={style.RecipeFix}>
                    <BurgerConstructorElement
                        key={bun._id + 'bottom'}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                        isLocked={true}
                        type='bottom'
                    />
                </div>
            )}

            <div className={style.SubmitContainer}>
                <p className={"text text_type_digits-medium " + style.Price}>{price}</p>
                <img className={style.Image} src={KrisatlIcon} alt='Иконка символа кристалла (виртуальная валюта)' />
                <Button type="primary" size="large" onClick={handelCreateOrder}>
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && <OrderDetails onClose={handleCloseOrderModal} />}
        </section>
    )
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientType).isRequired,
    price: PropTypes.number
}

export default BurgerConstructor;