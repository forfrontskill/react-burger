import React from "react";
import PropTypes from 'prop-types';
import IngredientDetailsCalorie from "../ingredient-details-calorie/ingredient-details-calorie";

import styles from './ingredient.module.css';

const Ingrdient = ({image, name, calories, carbohydrates, fat, proteins}) => {
    return(
        <div className={styles.IngredientDetails}>
                <img className={styles.Image} src={image} alt='Изображение ингредиента'/>
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

Ingrdient.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired
}

export default Ingrdient;