import React, { useContext, useEffect, useReducer, useState } from "react";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import KrisatlIcon from '../../images/kristal_icon.svg';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import { IngredientsContext } from "../../services/appContext";
import { createOrder } from "../../utils/burger-api";

const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
const ORDER_NUMBER_CREATED = 'ORDER_NUMBER_CREATED';

const initialState = {
    price: 0,
    bun: undefined,
    ingredients: [],
    orderIds: [],
    orderNumber: null
};

function reducer(state, action) {
    switch (action.type) {
        case ADD_INGREDIENTS: {
            const bun = action.ingredients.find((ingredient) => ingredient.type === 'bun');
            const ingredientWithoutBuns = action.ingredients.filter((ingredient) => ingredient.type !== 'bun');

            const combinedBun = bun ? bun : { ...state.bun };
            const combinedIngredients = ingredientWithoutBuns ? [...state.ingredients, ...ingredientWithoutBuns] : [...state.ingredients];

            const allIngredients = [combinedBun, combinedBun, ...combinedIngredients];

            const price = allIngredients.reduce((acc, item) => {
                return acc + item.price;
            }, 0);

            const orderIds = allIngredients.reduce((acc, item) => {
                return [...acc, item._id];
            }, []);

            return {
                price,
                orderIds,
                bun: combinedBun,
                ingredients: combinedIngredients,
                orderNumber: null
            }
        }
        case ORDER_NUMBER_CREATED: {
            return {
                price: 0,
                bun: undefined,
                ingredients: [],
                orderIds: [],
                orderNumber: action.orderNumber
            }
        }
        default: {
            throw new Error(`Ошибочный тип action: ${action.type}`);
        }
    }
}

const BurgerConstructor = () => {
    const [isOpenModal, setOpenModal] = useState(false);

    const ingredients = useContext(IngredientsContext);

    const [order, dispatch] = useReducer(reducer, initialState);
    const price = order.price;
    const ingredientWithoutBuns = order.ingredients;
    const bun = order.bun;

    useEffect(() => {
        dispatch({ type: ADD_INGREDIENTS, ingredients });
    }, [dispatch, ingredients]);

    const handelCreateOrder = () => {
        createOrder(order.orderIds)
            .then((data) => {
                dispatch({ type: ORDER_NUMBER_CREATED, orderNumber: data.order.number });
                setOpenModal(true);
                return data;
            })
            .catch(err => {
                console.log('Ошибка получения данных:', err);
            })
    }

    const handleCloseOrderModal = () => {
        setOpenModal(false);
    }


    return (
        <section className={style.BurgerConstructor}>
            {bun && (
                <div className={style.RecipeFix}>
                    <BurgerConstructorElement
                        key={bun._id + 'top'}
                        text={`${bun.name} (верх)`}
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
                        text={`${bun.name} (низ)`}
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
                <Button type="primary" size="large" onClick={handelCreateOrder} disabled={order.orderNumber}>
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && <OrderDetails orderNumber={order.orderNumber} onClose={handleCloseOrderModal} />}
        </section>
    )
};


export default BurgerConstructor;