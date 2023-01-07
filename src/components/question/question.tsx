import React from "react";
import { Link } from 'react-router-dom';

import styles from './question.module.css';

type Props = {
    questionText: string,
    questionLinkText: string,
    linkUrl: string,
}

const Question = ({ questionText, questionLinkText, linkUrl }: Props) => {
    return (
        <div className={styles.Question}>
            <p className={`text text_type_main-default text_color_inactive ${styles.Text}`}>{questionText}</p>
            <Link className={`text text_type_main-default ${styles.Link}`} to={linkUrl}>{questionLinkText}</Link>
        </div>
    )
}

export default Question;