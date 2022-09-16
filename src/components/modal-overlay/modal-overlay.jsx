import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import style from './modal-overlay.module.css';


const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ onClick, children }) => {

    const overlayClick = (evt) => {
        if(evt.target.className === style.ModalOverlay){
            onClick();
        }
    }

    const modal = (
        <div className={style.ModalOverlay} onMouseDown={overlayClick}>
            {children}
        </div>
    )

    return ReactDOM.createPortal(modal, modalRoot)
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ModalOverlay;