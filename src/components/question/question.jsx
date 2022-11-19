import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './question.module.css';



const Question = ({questionText, questionLinkText, linkUrl}) => {
    return (
        <div className={styles.Question}>
            <p className={`text text_type_main-default text_color_inactive ${styles.Text}`}>{questionText}</p>
            <Link className={`text text_type_main-default ${styles.Link}`} to={linkUrl}>{questionLinkText}</Link>
        </div>
    )
}

Question.propTypes = {
    questionText: PropTypes.string.isRequired,
    questionLinkText: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
}

export default Question;