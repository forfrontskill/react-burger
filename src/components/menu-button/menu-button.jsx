import React from "react";
import PropTypes from 'prop-types';

import style from './menu-button.module.css';

const MenuButton = ({icon, text, type='inactive', onClick=()=>{}}) => {

    const iconType = type === 'inactive' ? 'secondary' : 'primary';
    const textType = type === 'inactive' ? 'text_color_inactive' : 'text_color_primary';

    const iconWithClass = React.cloneElement(icon, {type: iconType});

    return (
        <a className={style.MenuButton} onClick={onClick} href=''>
            {iconWithClass}<span className={`text text_type_main-default ${textType} ` + style.Text}>{text}</span>
        </a>
    )
}

MenuButton.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func
}

export default MenuButton;