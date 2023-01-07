import React from "react";
import IngredientDetailsCalorie from "../ingredient-details-calorie/ingredient-details-calorie";

import styles from './ingredient.module.css';

type Props = {
    image: string;
    name: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    proteins: number;
}

const Ingrdient = ({ image, name, calories, carbohydrates, fat, proteins }: Props) => {
    return (
        <div className={styles.IngredientDetails}>
            <img className={styles.Image} src={image} alt='Изображение ингредиента' />
            <p className={'text text_type_main-medium ' + styles.Title}>{name}</p>
            <div className={styles.Calories}>
                <IngredientDetailsCalorie title='Калории,ккал' value={calories} />
                <IngredientDetailsCalorie title='Белки, г' value={proteins} />
                <IngredientDetailsCalorie title='Жиры, г' value={fat} />
                <IngredientDetailsCalorie title='Углеводы, г' value={carbohydrates} />
            </div>
        </div>
    )
}

export default Ingrdient;