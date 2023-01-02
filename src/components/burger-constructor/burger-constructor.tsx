import React, { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { useDrop } from "react-dnd";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import KrisatlIcon from '../../images/kristal_icon.svg';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import {
    addIngredients,
    closeOrderModal,
    createOrder,
    deleteIngredientFromOrder,
    moveIngredientInOrder
} from "../../services/actions/order";
import { uuidv4 } from "../../utils/utils";
import { useAuth } from "../../hooks/useAuth";



const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    //@ts-ignore
    const { user } = useAuth();

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            // @ts-ignore
            const ingr = { ...ingredient, key: uuidv4() };
            dispatch(addIngredients(ingr))
        },
    });
    // @ts-ignore
    const order = useSelector(store => store.order);

    const price = order.price;
    const ingredientWithoutBuns = order.ingredients;
    const bun = order.bun;
    const isEmptyBun = bun && Object.keys(bun).length !== 0;

    const orderStatus = order.orderRequest ? 'Заказываем...' : 'Оформить заказ';

    const handleCreateOrder = () => {
        if (user.name) {
            // @ts-ignore
            dispatch(createOrder(order.orderIds));
        } else {
            history.replace({ pathname: '/login' });
        }
    }

    const handleCloseOrderModal = () => {
        dispatch(closeOrderModal());
    }

    const moveIngr = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveIngredientInOrder(dragIndex, hoverIndex));
    }, [dispatch]);

    const handleDelete = (key: string) => {
        dispatch(deleteIngredientFromOrder(key));
    }

    return (
        <section className={style.BurgerConstructor} ref={dropTarget}>
            {isEmptyBun && (
                <div className={style.RecipeFix}>
                    <BurgerConstructorElement
                        key={bun.key}
                        ingredient={bun}
                        bunPositionName={' (верх)'}
                        isLocked={true}
                        type='top'
                        moveIngr={() => { }}
                    />
                </div>
            )}
            <div className={style.Recipes}>
                {/* @ts-ignore */}
                {ingredientWithoutBuns.map((burgerElement, index) => {
                    return (<BurgerConstructorElement
                        key={burgerElement.key}
                        index={index}
                        ingredient={burgerElement}
                        isLocked={false}
                        moveIngr={moveIngr}
                        handleClose={handleDelete}
                    />);
                })}
            </div>
            {isEmptyBun && (
                <div className={style.RecipeFix}>
                    <BurgerConstructorElement
                        key={bun.key}
                        ingredient={bun}
                        bunPositionName={' (низ)'}
                        isLocked={true}
                        type='bottom'
                        moveIngr={() => { }}
                    />
                </div>
            )}


            <div className={style.SubmitContainer}>
                <p className={"text text_type_digits-medium " + style.Price}>{price}</p>
                <img className={style.Image} src={KrisatlIcon} alt='Иконка символа кристалла (виртуальная валюта)' />
                <Button type="primary" size="large" onClick={handleCreateOrder} disabled={!order.isCanCreateOrder} htmlType='submit'>
                    {orderStatus}
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