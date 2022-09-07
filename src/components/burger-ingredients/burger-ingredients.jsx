import React from "react";
import  {Tab}  from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    // const [current, setCurrent] = useState('one');
    const setCurrent = () => {};
    const current = 'one';

    return (
        <div className={style.BurgerIngredients}>
             <h1>Соберите бургер</h1>
                <div className={style.TabGroup}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
        </div>
    )
};

export default BurgerIngredients;