import React from "react";
import PropTypes from 'prop-types';

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import style from './burger-ingredients-group.module.css';

const BurgerIngredientsGroup = ({ id, title, list, onClick,refHead }) => {
    return (
        <>
            <h2 ref={refHead} id={id} className={'text text_type_main-medium ' + style.GroupTitle}>{title}</h2>
            <div className={style.BurgerIngredientsGroup}>
                {list.map((ingredient) => <BurgerIngredient key={ingredient._id} ingredient={ingredient} onClick={onClick} />)}
            </div>
        </>
    )
}

BurgerIngredientsGroup.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    refHead: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
}

export default BurgerIngredientsGroup;