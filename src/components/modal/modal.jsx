import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";

import style from './modal.module.css';


const Modal = ({ title, onClose, children }) => {

    useEffect(() => {
        const eventEscKey = (evt) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', eventEscKey);
        return () => {
            document.removeEventListener('keydown', eventEscKey);
        }

    }, [onClose])

    return (
        <ModalOverlay onClick={onClose}>
            <div className={style.Container}>
                {title && <h2 className={'text text_type_main-large ' + style.Title}>{title}</h2>}
                <button className={style.ButtonClose} onClick={onClose}></button>
                {children}
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Modal;