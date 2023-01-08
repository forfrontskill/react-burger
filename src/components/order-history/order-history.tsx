import React, { useCallback, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import OrderCard from "../order-card/order-card";

import styles from './order-history.module.css';
import { wsCreatedOrdersConnectionClosed, wsCreatedOrdersConnectionStart } from "../../services/actions/createdOrders";
import { useDispatch, useSelector } from "../../hooks/hooks";

const OrderHistory = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const orders = useSelector(store => store.createdOrders.orders);

    useEffect(()=>{
        dispatch(wsCreatedOrdersConnectionStart());
        return ()=>{
            dispatch(wsCreatedOrdersConnectionClosed());
        }
    },[dispatch])

    const redirectModalUrl = useCallback(
        (id) => {
            history.push({ pathname: `/profile/orders/${id}` }, { profileOrderStatusModal: location });
        },
        [history, location]
    );

    const handleOpenModal = (id:string) => {
        redirectModalUrl(id);
    }

    return (
        <div className={styles.OrderHistory}>
            {orders.map(order => <OrderCard key={order._id} order={order} onClick={handleOpenModal} showStatus={true}/>)}
        </div>
    )
}

export default OrderHistory;