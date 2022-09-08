import React from "react";

import style from './menu-button.module.css';

const MenuButton = ({icon, text='', type='inactive', onClick=()=>{}}) => {

    const iconType = type === 'inactive' ? 'secondary' : 'primary';
    const textType = type === 'inactive' ? 'text_color_inactive' : 'text_color_primary';

    const iconWithClass = React.cloneElement(icon, {type: iconType});

    return (
        <button className={style.MenuButton} onClick={onClick}>
            {iconWithClass}<span className={`text text_type_main-default ${textType} ` + style.Text}>{text}</span>
        </button>
    )
}


export default MenuButton;