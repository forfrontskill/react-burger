import React, { useState,useMemo } from "react";
import PropTypes from 'prop-types';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Title from "../title/title";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";

import style from './burger-ingredients.module.css';

import { ingredientFilter } from '../../utils/utils';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientType } from "../../utils/objects";

const BurgerIngredients = ({ ingredients }) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalIngredient, setModalIngredient] = useState({});
    const [current, setCurrent] = useState('bun');

    const handleClickAnchor = (key) => {
        setCurrent(key);
        const element = document.getElementById(key);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });;
    }

    const mainList = useMemo(()=>ingredientFilter(ingredients),[ingredients]);

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
                <BurgerIngredientsGroup id='bun' list={mainList.bun} title='Булки' onClick={handleModalOpen}/>
                <BurgerIngredientsGroup id='main' list={mainList.main} title='Начинки' onClick={handleModalOpen}/>
                <BurgerIngredientsGroup id='sauce' list={mainList.sauce} title='Соусы' onClick={handleModalOpen}/>
            </div>
            {isModalOpen && <IngredientDetails onClose={handleModalClose} ingredient={modalIngredient}/>}
        </section>
    )
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientType).isRequired
}

export default BurgerIngredients;