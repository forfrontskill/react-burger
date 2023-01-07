import React, { useCallback, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import FeedStatus from "../../components/feed-status/feed-status";
import OrderCard from "../../components/order-card/order-card";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { wsFeedConnectionClose, wsFeedConnectionStart } from "../../services/actions/feed";
import { TOrder } from "../../services/types/data";

import styles from './feed.module.css';

const Feed = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { orders, total, totalToday } = useSelector(store => store.feed);

    useEffect(() => {
        dispatch(wsFeedConnectionStart())
        return () => {
            dispatch(wsFeedConnectionClose())
        }
    }, [dispatch])

    const redirectModalUrl = useCallback(
        (id) => {
            history.push({ pathname: `/feed/${id}` }, { feedOrderStatusModal: location });
        },
        [history, location]
    );

    const handleClick = (id:string) => {
        redirectModalUrl(id);
    }

    return (
        <div className={styles.FeedPage}>
            <h1 className={`text text_type_main-large pb-5 ${styles.Title}`}>Лента заказов</h1>
            <div className={styles.Feed}>

                <div className={styles.Orders}>
                    {orders.map((order: TOrder) => <OrderCard key={order._id} order={order} onClick={handleClick} />)}
                </div>
                <FeedStatus orders={orders} total={total} totalToday={totalToday} />
            </div>
        </div>
    )
}

export default Feed;