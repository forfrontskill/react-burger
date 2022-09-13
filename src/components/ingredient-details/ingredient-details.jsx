import React from "react";
import PropTypes from 'prop-types';
import IngredientDetailsCalorie from "../ingredient-details-calorie/ingredient-details-calorie";
import ModalOverlay from "../modal-overlay/modal-overlay";

import style from './ingredient-details.module.css';


const IngredientDetails = ({ isOpen=false, onClose=()=>{}, ingredient }) => {
    const { image_large:image, name, calories, carbohydrates, fat, proteins } = ingredient;
    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose} title='Детали ингредиента'>
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
        </ModalOverlay>
    )
};

IngredientDetails.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    ingredient: PropTypes.object
}

export default IngredientDetails;