import React, { JSXElementConstructor, MouseEventHandler, ReactElement, SyntheticEvent } from "react";

import style from './menu-button.module.css';

type Props = {
    icon: ReactElement<{ type: string; }, string | JSXElementConstructor<any>>;
    text: string;
    type: string;
    onClick: (e: SyntheticEvent)=>MouseEventHandler<Element> | void;
}

const MenuButton = ({icon, text, type='inactive', onClick}:Props) => {

    const iconType = type === 'inactive' ? 'secondary' : 'primary';
    const textType = type === 'inactive' ? 'text_color_inactive' : 'text_color_primary';

    const iconWithClass = React.cloneElement(icon, {type: iconType});

    return (
        <a className={style.MenuButton} onClick={onClick} href='/#'>
            {iconWithClass}<span className={`text text_type_main-default ${textType} ` + style.Text}>{text}</span>
        </a>
    )
}

export default MenuButton;