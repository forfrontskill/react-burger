import React from "react";
import { TDicListStatus } from "../../services/types/data";

type TDicListNameStatus = 'Выполнен' | 'Готовится';
type TDicStatusItem = {
    name: TDicListNameStatus;
    color: string;
}
type TDicStatus = {
    [key in TDicListStatus]: TDicStatusItem;
}

const dicStatus: TDicStatus = {
    done: {
        name: 'Выполнен',
        color: '#00CCCC'
    },
    created: {
        name: 'Выполнен',
        color: '#F2F2F3'
    },
    pending: {
        name: 'Готовится',
        color: '#F2F2F3'
    },

}

type Props = {
    status: TDicListStatus;
    number?: number;
    mix?: string;
}


const OrderStatus = ({ status, number, mix = '' }: Props) => {

    const styledStatus: TDicStatusItem = dicStatus[status];

    return (
        <>
            {number ? (
                <p
                    className={`text text_type_digits-default pt-2 ${mix}`}
                    style={{ color: styledStatus.color }}
                >
                    {number}
                </p>
            ) : (
                <p
                    className={`text text_type_main-small pt-2 ${mix}`}
                    style={{ color: styledStatus.color }}
                >
                    {styledStatus.name}
                </p>
            )}
        </>
    )
}

export default OrderStatus;