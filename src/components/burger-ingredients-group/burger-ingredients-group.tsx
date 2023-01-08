import React, { MouseEventHandler } from "react";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import style from './burger-ingredients-group.module.css';
import { TIngredient } from "../../services/types/data";

type Props = {
    id: string;
    title: string;
    list: TIngredient[];
    onClick: (ingredient: TIngredient) => MouseEventHandler<HTMLDivElement>;
    refHead: React.RefObject<HTMLDivElement>
}

const BurgerIngredientsGroup = ({ id, title, list, onClick, refHead }: Props) => {
    return (
        <>
            <h2 ref={refHead} id={id} className={'text text_type_main-medium ' + style.GroupTitle}>{title}</h2>
            <div className={style.BurgerIngredientsGroup}>
                {list.map((ingredient) => <BurgerIngredient key={ingredient._id} ingredient={ingredient} onClick={onClick} />)}
            </div>
        </>
    )
}

export default BurgerIngredientsGroup;