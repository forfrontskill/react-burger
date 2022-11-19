import React, { useState, useMemo, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Route } from 'react-router-dom';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Title from "../title/title";
import Modal from "../modal/modal";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";
import { ingredientFilter } from '../../utils/utils';
import IngredientDetails from "../ingredient-details/ingredient-details";

import { CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL } from "../../services/actions/menu";

import style from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const ingredients = useSelector(store => store.menu.items);
    const { showIngredientModalInfo, modalIngredient } = useSelector(store => store.menu);

    const ContainerIngredientsRef = useRef();
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();

    const [current, setCurrent] = useState('bun');

    const handleClickAnchor = (key) => {
        setCurrent(key);
        if (key === 'bun') {
            bunRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (key === 'sauce') {
            sauceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (key === 'main') {
            mainRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    const handleScroll = () => {
        const topContainer = ContainerIngredientsRef.current.getBoundingClientRect().top;
        const bottomContainer = ContainerIngredientsRef.current.getBoundingClientRect().bottom;
        const topBun = bunRef.current.getBoundingClientRect().top;
        const topMain = mainRef.current.getBoundingClientRect().top;
        const topSauce = sauceRef.current.getBoundingClientRect().top;

        if (topContainer <= topBun && topBun <= bottomContainer) {
            setCurrent('bun');
        } else if (topContainer <= topMain && topMain <= bottomContainer) {
            setCurrent('main');
        } else if (topContainer <= topSauce && topSauce <= bottomContainer) {
            setCurrent('sauce');
        }
    }

    const mainList = useMemo(() => ingredientFilter(ingredients), [ingredients]);

    const redirectModalUrl = useCallback(
        (id) => {
            history.push({ pathname: `/ingredients/${id}` }, { fromModal: true });
        },
        [history]
    );

    const handleModalOpen = (ingredient) => () => {
        dispatch({ type: OPEN_INGREDIENT_MODAL, ingredient });
        redirectModalUrl(ingredient._id);
    }
    const handleModalClose = () => {
        history.push({ pathname: `/` }, { fromModal: false });
        dispatch({ type: CLOSE_INGREDIENT_MODAL });
    }

    return (
        <section className={style.BurgerIngredients}>
            <Title text='Соберите бургер' />
            <div className={style.TabGroup}>
                <Tab value="bun" active={current === 'bun'} onClick={handleClickAnchor}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClickAnchor}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleClickAnchor}>
                    Соусы
                </Tab>
            </div>
            <div className={style.BurgerIngredientsList} onScroll={handleScroll} ref={ContainerIngredientsRef}>
                <BurgerIngredientsGroup id='bun' list={mainList.bun} title='Булки' onClick={handleModalOpen} refHead={bunRef} />
                <BurgerIngredientsGroup id='main' list={mainList.main} title='Начинки' onClick={handleModalOpen} refHead={mainRef} />
                <BurgerIngredientsGroup id='sauce' list={mainList.sauce} title='Соусы' onClick={handleModalOpen} refHead={sauceRef} />
            </div>
            {showIngredientModalInfo && (
                <Route path='/ingredients/:id' render={()=>{ return(
                    <Modal onClose={handleModalClose} title='Детали ингредиента'>
                        <IngredientDetails ingredient={modalIngredient} />
                    </Modal>
                )}}/>
            )}
        </section>
    )
};


export default BurgerIngredients;