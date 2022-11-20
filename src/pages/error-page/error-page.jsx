import React from "react";

import styles from './error-page.module.css';


const ErrorPage = () => {
    return <div className={styles.ErrorPage}>
        <p className={`text text_type_main-large ${styles.ErrorMessage}`}>
            Ошибка загрузки страницы
        </p>
    </div>
}

export default ErrorPage;