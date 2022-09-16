import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import style from './modal-overlay.module.css';


const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ children }) => {

    const modal = (
        <div className={style.ModalOverlay}>
            {children}
        </div>
    )

    return ReactDOM.createPortal(modal, modalRoot)
}

ModalOverlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ModalOverlay;