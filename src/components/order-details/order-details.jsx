import React from "react";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import doneOrderIcon from '../../images/done_order_icon.svg';

import style from './order-details.module.css';


const OrderDetails = ({ isOpen = false, onClose = () => { } }) => {
    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose}>
            <div className={style.OrderDetails}>
                <p className={'text text_type_digits-large ' + style.Number}>034536</p>
                <p className='text text_type_main-medium'>идентификатор заказа</p>
                <img className={style.Image} src={doneOrderIcon} alt='Иконка статуса заказа'/>
                <p className={'text text_type_main-default ' + style.Status}>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
            </div>
        </ModalOverlay>
    )
}

OrderDetails.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default OrderDetails;