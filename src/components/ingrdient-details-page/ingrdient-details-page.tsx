import React from "react";

import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from "../../hooks/hooks";
import { TIngredient } from "../../services/types/data";
import Ingrdient from "../ingredient/ingredient";

import styles from './ingrdient-details-page.module.css';


const IngredientDetailsPage = () => {

    const { id } = useParams<{id:string}>();


    const ingredient = useSelector(store => store.menu.items.find((item:TIngredient) => item._id === id));
    const isFetching = useSelector(store => store.menu.itemsRequest);

    return (
        <div className={styles.Ingredient}>
            {!isFetching && (
                <>
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
                </>
            )}
        </div>
    )
}

export default IngredientDetailsPage;