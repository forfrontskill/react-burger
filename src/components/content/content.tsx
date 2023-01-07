import React, { FC } from "react";
import PropTypes from 'prop-types';

import style from './content.module.css';

const Content: FC = ({ children }) => {
    return (<main className={style.Content}>
        {children}
    </main>)
};

Content.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Content;