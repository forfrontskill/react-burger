import React, { useState, useMemo, useContext } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Title from "../title/title";
import Modal from "../modal/modal";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";

import style from './burger-ingredients.module.css';

import { ingredientFilter } from '../../utils/utils';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientsContext } from "../../services/appContext";

const BurgerIngredients = () => {

    const ingredients = useContext(IngredientsContext)

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalIngredient, setModalIngredient] = useState({});
    const [current, setCurrent] = useState('bun');

    const handleClickAnchor = (key) => {
        setCurrent(key);
        const element = document.getElementById(key);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });;
    }

    const mainList = useMemo(() => ingredientFilter(ingredients), [ingredients]);

    const handleModalOpen = (ingredient) => () => {
        setModalIngredient(ingredient);
        setModalOpen(true);
    }
    const handleModalClose = () => {
        setModalOpen(false);
    }

    return (
        <section className={style.BurgerIngredients}>
            <Title text='Соберите бургер' />
            <div className={style.TabGroup}>
                <Tab value="bun" active={current === 'bun'} onClick={handleClickAnchor}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleClickAnchor}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClickAnchor}>
                    Начинки
                </Tab>
            </div>

            <div className={style.BurgerIngredientsList}>
                <BurgerIngredientsGroup id='bun' list={mainList.bun} title='Булки' onClick={handleModalOpen} />
                <BurgerIngredientsGroup id='main' list={mainList.main} title='Начинки' onClick={handleModalOpen} />
                <BurgerIngredientsGroup id='sauce' list={mainList.sauce} title='Соусы' onClick={handleModalOpen} />
            </div>
            {isModalOpen &&
                <Modal onClose={handleModalClose} title='Детали ингредиента'>
                    <IngredientDetails ingredient={modalIngredient} />
                </Modal>
            }
        </section>
    )
};


export default BurgerIngredients;