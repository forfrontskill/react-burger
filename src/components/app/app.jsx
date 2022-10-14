import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Content from '../../components/content/content';
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../services/actions/menu";


const App = () => {

    const dispatch = useDispatch();

    const { itemsRequest, itemsRequestFailed, itemsRequestFailedMessage } = useSelector(store => store.menu);

    useEffect(() => {
        dispatch(getMenu());
    }, [dispatch])

    return (
        <>
            <AppHeader />
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
        </>
    )
}

export default App;