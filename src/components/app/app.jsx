import React, { useEffect, useState } from "react";

import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Content from '../../components/content/content';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from "../../services/appContext";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../services/actions/menu";

const App = () => {

    const dispatch = useDispatch();

    const menu = useSelector(store => store.menu);
    console.log(menu);

    const [isFetching, setFetching] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(getMenu());
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <IngredientsContext.Provider value={ingredients}>
                <Content>
                    {isFetching ? (
                        <>
                            {errorMessage ? (
                                <p>{errorMessage}</p>
                            ) : (
                                <>
                                    <BurgerIngredients />
                                    <BurgerConstructor />
                                </>
                            )}
                        </>
                    ) : (
                        <p>ЗАГРУЗКА....</p>
                    )}
                </Content>
            </IngredientsContext.Provider>
        </>
    )
}

export default App;