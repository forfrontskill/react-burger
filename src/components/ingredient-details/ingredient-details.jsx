import React from "react";
import IngredientDetailsCalorie from "../ingredient-details-calorie/ingredient-details-calorie";

import style from './ingredient-details.module.css';
import { IngredientType } from "../../utils/objects";


const IngredientDetails = ({ ingredient }) => {
    const { image_large:image, name, calories, carbohydrates, fat, proteins } = ingredient;
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

IngredientDetails.propTypes = {
    ingredient: IngredientType.isRequired
}

export default IngredientDetails;