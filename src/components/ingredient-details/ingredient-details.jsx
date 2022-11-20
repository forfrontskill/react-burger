import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Ingrdient from "../ingredient/ingredient";
import Loader from "../loader/loader";


const IngredientDetails = () => {
    const { id } = useParams();
    const ingredient = useSelector(store => store.menu.items.find(item => item._id === id));
    const isFetching = useSelector(store => store.menu.itemsRequest);

    return (
        <>
            {(isFetching) ? (
                <Loader />
            ) : (
                <Ingrdient
                    image={ingredient.image_large}
                    name={ingredient.name}
                    calories={ingredient.calories}
                    carbohydrates={ingredient.carbohydrates}
                    fat={ingredient.fat}
                    proteins={ingredient.proteins}
                />
            )}
        </>
    )
};


export default IngredientDetails;