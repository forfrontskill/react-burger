import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

import style from './ingredient-details.module.css';


const IngredientDetails = ({isOpen, onClose, ingredient}) => {
    const {image, name,calories,carbohydrates,fat,proteins} = ingredient;
    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose} title='Детали ингредиента'>
                <img src={image}/>
                <p>{name}</p>
                <div>
                    <p>Tedd</p>
                    <span>{calories}</span>
                </div>
        </ModalOverlay>
    )
};

export default IngredientDetails;