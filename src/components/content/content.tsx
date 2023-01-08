import React, { FC } from "react";

import style from './content.module.css';

const Content: FC = ({ children }) => {
    return (<main className={style.Content}>
        {children}
    </main>)
};

export default Content;