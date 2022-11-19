import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from 'react-router-dom';
import Ingrdient from "../ingredient/ingredient";

import styles from './ingrdient-details-page.module.css';


const IngredientDetailsPage = () => {
    const { id } = useParams();

    const ingredient = useSelector(store => store.menu.items.find(item => item._id === id));

    return (
        <div className={styles.Ingredient}>
            {ingredient ? (
                <Ingrdient
                    image={ingredient.image_large}
                    name={ingredient.name}
                    calories={ingredient.calories}
                    carbohydrates={ingredient.carbohydrates}
                    fat={ingredient.fat}
                    proteins={ingredient.proteins}
                />
            ) : (
                <Redirect
                    to={{
                        pathname: '/404'
                    }}
                />
            )}

        </div>
    )
}

export default IngredientDetailsPage;