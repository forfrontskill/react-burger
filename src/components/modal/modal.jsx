import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from 'react-dom';

import style from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

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

    const modal = (
        <>
            <div className={style.Container}>
                {title && <h2 className={'text text_type_main-large ' + style.Title}>{title}</h2>}
                <button className={style.ButtonClose} onClick={onClose}></button>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>
    )

    return ReactDOM.createPortal(modal, modalRoot)
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