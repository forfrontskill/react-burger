import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Content from "../../components/content/content";
import { useSelector } from "../../hooks/hooks";


const OrderConstructor = () => {

    const { itemsRequest, itemsRequestFailed, itemsRequestFailedMessage } = useSelector(store => store.menu);

    return (
        <Content>
            {itemsRequest ? (
                <p>ЗАГРУЗКА....</p>
            ) : (
                <>
                    {itemsRequestFailed ? (
                        <p>{itemsRequestFailedMessage}</p>
                    ) : (
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider>
                    )}
                </>
            )}
        </Content>
    )
}

export default OrderConstructor;