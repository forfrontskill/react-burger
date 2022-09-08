import React from "react";
import PropTypes from 'prop-types';

import style from './content.module.css';

const Content = ({children}) => {
    return <main className={style.Content}>
        {children}
    </main>
};

Content.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
} 

export default Content;