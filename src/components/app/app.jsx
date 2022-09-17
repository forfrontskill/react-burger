import React, { useEffect, useState } from "react";

import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Content from '../../components/content/content';
import { getIngredients } from '../../utils/burger-api'


const App = () => {

    const [isFetching, setFetching] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getIngredients()
            .then(({ data }) => {
                setIngredients(data);
            })
            .catch(err => {
                console.log('Ошибка получения данных:', err);
                setErrorMessage(err);
            })
            .finally(() => {
                setFetching(true);
            })
    }, [])

    return (
        <>
            <AppHeader />
            <Content>
                {isFetching ? (
                    <>
                        {errorMessage ? (
                            <p>{errorMessage}</p>
                        ) : (
                            <>
                                <BurgerIngredients ingredients={ingredients} />
                                <BurgerConstructor ingredients={ingredients} price={12}/>
                            </>
                        )}
                    </>
                ) : (
                    <p>ЗАГРУЗКА....</p>
                )}
            </Content>
        </>
    )
}

export default App;