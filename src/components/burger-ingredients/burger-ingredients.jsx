import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Title from "../title/title";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";

import style from './burger-ingredients.module.css';

import { ingredientFilter } from '../utils/utils';
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = ({ ingredients = [] }) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalIngredient, setModalIngredient] = useState({});
    const [current, setCurrent] = useState('bun');
    const [anchors, setAnchors] = useState({});

    const refBun = useRef();
    const refMain = useRef();
    const refSauce = useRef();

    useEffect(() => {
        setAnchors({ ...anchors, bun: refBun, main: refMain, sauce: refSauce });
    }, []);

    const handleClickAnchor = (key) => (event) => {
        setCurrent(key);
        anchors[key].current.scrollIntoView({ behavior: 'smooth', block: 'start' });;
    }

    const mainList = ingredientFilter(ingredients);

    const handleModalOpen = (ingredient) => () => {
        console.log(ingredient);
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
                <Tab value="bun" active={current === 'bun'} onClick={handleClickAnchor('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleClickAnchor('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClickAnchor('main')}>
                    Начинки
                </Tab>
            </div>

            <div className={style.BurgerIngredientsList}>
                <BurgerIngredientsGroup list={mainList.bun} title='Булки' refProp={refBun} onClick={handleModalOpen}/>
                <BurgerIngredientsGroup list={mainList.main} title='Начинки' refProp={refMain} onClick={handleModalOpen}/>
                <BurgerIngredientsGroup list={mainList.sauce} title='Соусы' refProp={refSauce} onClick={handleModalOpen}/>
            </div>
            <IngredientDetails isOpen={isModalOpen} onClose={handleModalClose} ingredient={modalIngredient}/>
        </section>
    )
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array
}

export default BurgerIngredients;