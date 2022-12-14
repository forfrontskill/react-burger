import React from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";


import styles from './order-card.module.css';
import OrderStatus from "../order-status/order-status";
import { useSelector } from "react-redux";

import { fillDetailedInformationOrder } from "../../utils/utils";
import IngredientImage from "../ingredient-image/ingredient-image";



const OrderCard = ({ order, onClick, showStatus = false }) => {

    const descriptionIngr = useSelector(store => store.menu.items);

    const { number, name, status, ingredients, createdAt } = order;

    const detailedInfo = fillDetailedInformationOrder(ingredients, descriptionIngr);

    const date = new Date(createdAt);

    const handleClick = () => {
        onClick(order._id);
    }

    return (
        <div className={styles.OrderCard} onClick={handleClick}>
            <div className={styles.Header}>
                <span className="text text_type_digits-default pb-6">#{number}</span>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={date} />
            </div>
            <span className={`text text_type_main-medium`}>{name}</span>
            {showStatus && <OrderStatus status={status} />}
            <div className={styles.Footer}>
                {Object.keys(detailedInfo.ingredients).map((key,index) => {

                    const item = detailedInfo.ingredients[key];
                    const zIndex = Object.keys(detailedInfo.ingredients).length - index;
                    const right =  index !== 0 ? 16*index : 0;
                    const mix = {zIndex: `${zIndex}`, right: `${right}px`} 

                    return (<IngredientImage
                        key={key}
                        image={item.image}
                        count={item.count > 1 && item.type !== 'bun' ? item.count : undefined}
                        mix={mix}
                        name={item.name}
                    />)
                })}
                <div className={styles.Price}>
                    <span className="text text_type_digits-default pr-2">{detailedInfo.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    showStatus: PropTypes.bool
}

export default OrderCard;