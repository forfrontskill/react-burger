import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import style from './burger-ingredients-group.module.css';

const BurgerIngredientsGroup = ({title,list,refProp}) => {
    return (
        <>
            <h2 ref={refProp} className={'text text_type_main-medium '+style.GroupTitle}>{title}</h2>
            <div className={style.BurgerIngredientsGroup}>
                {list.map((ingredient) => <BurgerIngredient key={ingredient._id} {...ingredient}/>)}
            </div>
        </>
    )
}

export default BurgerIngredientsGroup;