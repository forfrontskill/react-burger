import React, { MouseEventHandler } from "react";
import { useDrag } from "react-dnd";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-ingredient.module.css';
import { useSelector } from "../../hooks/hooks";
import { TIngredient } from "../../services/types/data";

type Props = {
    ingredient: TIngredient;
    onClick: (ingr: TIngredient) => MouseEventHandler<HTMLDivElement>;
};

const BurgerIngredient = ({ ingredient, onClick }: Props) => {
    const { image, price, name, } = ingredient;

    const ingredientCount = useSelector(store => store.order.ingredientCount);
    const count = ingredientCount[ingredient._id];
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div className={style.BurgerIngredient} onClick={onClick(ingredient)} ref={dragRef}>
            <img className={style.Image} src={image} alt={name} />
            <span className={'text text_type_digits-default ' + style.Price}>
                {price}
                <CurrencyIcon type="primary" />
            </span>
            <p className={'text text_type_main-small ' + style.Name}>{name}</p>
            {count && <Counter count={count} size="default" />}
        </div>
    )
}

export default BurgerIngredient;