import React, { useEffect } from "react";
import OrderDetailedStatus from "../../components/order-detailed-status/order-detailed-status";
import { wsFeedConnectionClose, wsFeedConnectionStart } from "../../services/actions/feed";

import styles from './order.module.css';
import { wsCreatedOrdersConnectionClosed, wsCreatedOrdersConnectionStart } from "../../services/actions/createdOrders";
import { useDispatch } from "../../hooks/hooks";

const Order = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsFeedConnectionStart());
        dispatch(wsCreatedOrdersConnectionStart())
        return () => {
            dispatch(wsFeedConnectionClose())
            dispatch(wsCreatedOrdersConnectionClosed())
        }
    }, [dispatch])

    return (
        <div className={styles.OrderPage}>
            <OrderDetailedStatus />
        </div>
    )
}

export default Order;