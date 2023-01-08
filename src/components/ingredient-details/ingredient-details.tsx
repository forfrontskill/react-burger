import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "../../hooks/hooks";
import { TIngredient } from "../../services/types/data";
import Ingrdient from "../ingredient/ingredient";
import Loader from "../loader/loader";


const IngredientDetails = () => {
    const { id } = useParams<{ id: string }>();
    const ingredient = useSelector<TIngredient | undefined>(store => store.menu.items.find((item: TIngredient) => item._id === id));
    const isFetching = useSelector<boolean>(store => store.menu.itemsRequest);

    if (!ingredient) {
        return (
            <>
                <div>Ошибка загрузки ингредиента</div>
            </>
        )
    }

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