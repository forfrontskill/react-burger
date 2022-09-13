import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import style from './modal-overlay.module.css';


const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ title, isOpen=false, onClose = () => { }, children }) => {

    const handleEscape = (evt) => {
        if (evt.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const modal = (
        <div className={style.ModalOverlay}>
            <div className={style.Container}>
                {title && <h2 className={'text text_type_main-large ' + style.Title}>{title}</h2>}
                <button className={style.ButtonClose} onClick={onClose}></button>
                {children}
            </div>
        </div>
    )

    return isOpen ? ReactDOM.createPortal(modal, modalRoot) : <></>
}

ModalOverlay.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ModalOverlay;