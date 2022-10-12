import React from "react";
import IngredientDetailsCalorie from "../ingredient-details-calorie/ingredient-details-calorie";

import style from './ingredient-details.module.css';
import { useSelector } from "react-redux";


const IngredientDetails = () => {
    const { image_large:image, name, calories, carbohydrates, fat, proteins } = useSelector(store => store.menu.modalIngredient)
    return (
            <div className={style.IngredientDetails}>
                <img className={style.Image} src={image} alt='Изображение ингредиента'/>
                <p className={'text text_type_main-medium ' + style.Title}>{name}</p>
                <div className={style.Calories}>
                    <IngredientDetailsCalorie title='Калории,ккал' value={calories} />
                    <IngredientDetailsCalorie title='Белки, г' value={proteins} />
                    <IngredientDetailsCalorie title='Жиры, г' value={fat} />
                    <IngredientDetailsCalorie title='Углеводы, г' value={carbohydrates} />
                </div>
            </div>
    )
};


export default IngredientDetails;