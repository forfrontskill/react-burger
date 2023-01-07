import React from "react";

import styles from './ingredient-image.module.css';

type Props = {
    image: string;
    count?: number;
    name: string;
    mix?: React.CSSProperties;
}

const IngredientImage = ({ image, count, name, mix}:Props) => {
    return (
        <div className={`${styles.Container}`} style={mix}>
            <div className={styles.BordersContainer}>
                <img className={styles.Image} src={image} alt={name}/>
            </div>
            {count && (
                <>
                    <div className={styles.NumberBackground}>
                        <p className={`text text_type_main-default`}>+{count}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default IngredientImage;