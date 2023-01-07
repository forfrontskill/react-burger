import React from "react";
import PropTypes from 'prop-types';

import style from './ingredient-details-calorie.module.css';

type Props = {
    title: string;
    value: string | number;
}

const IngredientDetailsCalorie = ({ title, value }: Props) => {
    return (
        <div className={style.IngredientDetailsCalorie}>
            <p className='text text_type_main-default text_color_inactive'>{title}</p>
            <p className='text text_type_digits-default text_color_inactive'>{value}</p>
        </div>
    )
}

IngredientDetailsCalorie.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}

export default IngredientDetailsCalorie;