import React from "react";
import PropTypes from 'prop-types';

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import style from './burger-ingredients-group.module.css';

const BurgerIngredientsGroup = ({ title, list, refProp, onClick=()=>{} }) => {
    return (
        <>
            <h2 ref={refProp} className={'text text_type_main-medium ' + style.GroupTitle}>{title}</h2>
            <div className={style.BurgerIngredientsGroup}>
                {list.map((ingredient) => <BurgerIngredient key={ingredient._id} ingredient={ingredient} onClick={onClick} />)}
            </div>
        </>
    )
}

BurgerIngredientsGroup.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    refProp: PropTypes.object,
    onClick: PropTypes.func
}

export default BurgerIngredientsGroup;