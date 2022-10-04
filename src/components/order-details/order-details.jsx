import React from "react";
import PropTypes from 'prop-types';
import doneOrderIcon from '../../images/done_order_icon.svg';

import style from './order-details.module.css';


const OrderDetails = ({orderNumber}) => {
    return (
            <div className={style.OrderDetails}>
                <p className={'text text_type_digits-large ' + style.Number}>{orderNumber}</p>
                <p className='text text_type_main-medium'>идентификатор заказа</p>
                <img className={style.Image} src={doneOrderIcon} alt='Иконка статуса заказа'/>
                <p className={'text text_type_main-default ' + style.Status}>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
            </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
}

export default OrderDetails;