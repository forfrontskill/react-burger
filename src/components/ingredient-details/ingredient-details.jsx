import React from "react";

import { useSelector } from "react-redux";
import Ingrdient from "../ingredient/ingredient";


const IngredientDetails = () => {
    const { image_large: image, name, calories, carbohydrates, fat, proteins } = useSelector(store => store.menu.modalIngredient)
    return (
        <Ingrdient
            image={image}
            name={name}
            calories={calories}
            carbohydrates={carbohydrates}
            fat={fat}
            proteins={proteins}
        />
    )
};


export default IngredientDetails;