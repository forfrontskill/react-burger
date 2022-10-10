import React, { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import KrisatlIcon from '../../images/kristal_icon.svg';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENTS, CLOSE_ORDER_MODAL, createOrder, MOVE_INGREDIENT_IN_ORDER } from "../../services/actions/order";



const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            console.log('Drop ingredient:', ingredient);
            dispatch({ type: ADD_INGREDIENTS, ingredients: [ingredient] });
        },
    });


    const ingredients = useSelector(store => store.menu.items);
    const order = useSelector(store => store.order);

    const price = order.price;
    const ingredientWithoutBuns = order.ingredients;
    const bun = order.bun;

    useEffect(() => {
        // dispatch({ type: ADD_INGREDIENTS, ingredients });
    }, [dispatch, ingredients]);

    const handleCreateOrder = () => {
        dispatch(createOrder(order.orderIds));
    }

    const handleCloseOrderModal = () => {
        dispatch({ type: CLOSE_ORDER_MODAL });
    }
    const isEmptyBun = Object.keys(bun).length !== 0;

    const moveIngr = useCallback((dragIndex, hoverIndex, id) => {
        console.log(`dragIndex:${dragIndex}, hoverIndex: ${hoverIndex}, id: ${id}`);
        dispatch({type:MOVE_INGREDIENT_IN_ORDER, dragIndex, hoverIndex});
      }, [])

    return (
        <section className={style.BurgerConstructor} ref={dropTarget}>
                {isEmptyBun && (
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
                    {ingredientWithoutBuns.map((burgerElement, index) => {
                        return <BurgerConstructorElement
                            key={burgerElement._id+'_'+index}
                            index={index}
                            id={burgerElement._id+'_'+index}
                            text={burgerElement.name}
                            price={burgerElement.price}
                            thumbnail={burgerElement.image}
                            isLocked={false}
                            moveIngr={moveIngr}
                        />;
                    })}
                </div>
                {isEmptyBun && (
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
                <Button type="primary" size="large" onClick={handleCreateOrder} disabled={order.orderNumber} htmlType='submit'>
                    Оформить заказ
                </Button>
            </div>
            {order.showOrderModalInfo &&
                <Modal onClose={handleCloseOrderModal}>
                    <OrderDetails orderNumber={order.orderNumber} />
                </Modal>
            }
        </section>
    )
};


export default BurgerConstructor;