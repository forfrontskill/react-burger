import React, { useEffect, useState } from "react";

import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Content from '../../components/content/content';

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {

    const [isFetching, setFetching] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(({ data }) => {
                setIngredients(data);
                setFetching(true);
            })
            .catch(err => {
                console.log('Ошибка получения данных:', err);
            })
    }, [])

    return (
        <>
            <AppHeader />
            <Content>
                {isFetching ? (
                    <>
                        <BurgerIngredients ingredients={ingredients}/>
                        <BurgerConstructor ingredients={ingredients}/>
                    </>
                ) : (
                    <p>ЗАГРУЗКА....</p>
                )}
            </Content>
        </>
    )
}

export default App;