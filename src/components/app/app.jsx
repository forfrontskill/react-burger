import React from "react";

import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Content from '../../components/content/content';

const App = () => {
    return (
        <>
            <AppHeader />
            <Content>
                <BurgerIngredients />
                <BurgerConstructor />
            </Content>
        </>
    )
}

export default App;