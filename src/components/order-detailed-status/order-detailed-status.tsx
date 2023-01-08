import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useParams, useRouteMatch } from 'react-router-dom';
import IngredientImage from "../ingredient-image/ingredient-image";
import { fillDetailedInformationOrder } from "../../utils/utils";
import Loader from "../loader/loader";
import OrderStatus from "../order-status/order-status";

import styles from './order-detailed-status.module.css';
import { useSelector } from "../../hooks/hooks";
import { TOrder } from "../../services/types/data";

const OrderDetailedStatus = () => {

    const { id } = useParams<{ id: string }>();
    const isFeedRoute = useRouteMatch('/feed/:id');
    const isProfileRoute = useRouteMatch('/profile/orders/:id');
    let order: TOrder = {
        _id: '',
        ingredients: [],
        status: 'done',
        name: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        number: 0,
    };

    const feedOrder:TOrder = useSelector(store => store.feed.orders.find((order: TOrder) => order._id === id) || order);
    const profileOrder:TOrder = useSelector(store => store.createdOrders.orders.find((order: TOrder) => order._id === id) || order);

    if (isFeedRoute) {
        order = feedOrder;
    } else if (isProfileRoute) {
        order = profileOrder;
    }

    const { number, name, status, ingredients, createdAt } = order;

    const descriptionIngr = useSelector(store => store.menu.items);

    const detailedInfo = fillDetailedInformationOrder(ingredients, descriptionIngr);

    const date = new Date(createdAt);


    return (
        <>
            {Object.keys(order).length !== 0 ? (
                <div className={styles.OrderDetailedStatus}>
                    <p className={`text text_type_digits-default pb-10 ${styles.Number}`}>#{number}</p>
                    <p className="text text_type_main-medium pb-3">{name}</p>
                    <OrderStatus status={status} mix="pb-15" />
                    <p className="text text_type_main-medium pb-6">Состав:</p>
                    <div className={styles.IngrdientList}>
                        {Object.keys(detailedInfo.ingredients).map(key => {
                            const { image, name, price, count } = detailedInfo.ingredients[key];
                            return (
                                <div key={key} className={styles.IngredientListItem}>
                                    <IngredientImage image={image} name={name} />
                                    <p className={`text text_type_main-small ${styles.Name}`}>{name}</p>
                                    <p className="text text_type_main-medium">{count} x {price} <CurrencyIcon type='primary'/></p>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.Footer}>
                        <FormattedDate className="text text_type_main-default text_color_inactive" date={date} />
                        <p className="text text_type_main-medium">{detailedInfo.price} <CurrencyIcon type='primary'/></p>
                    </div>
                </div>
            ) : (
                <Loader />
            )}

        </>
    )
}

export default OrderDetailedStatus;