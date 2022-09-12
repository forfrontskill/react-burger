import React from "react";
import ReactDOM from 'react-dom';

import style from './modal-overlay.module.css';


const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({title,isOpen, onClose = ()=>{} ,children}) => {
    
    const modal = (
        <div className={style.ModalOverlay}>
            <div className={style.Container}>
                {title && <h2 className={'text text_type_main-large ' + style.Title}>{title}</h2>}
                <button className={style.ButtonClose} onClick={onClose}></button>
                {children}
            </div>
        </div>
    )

    return isOpen ? ReactDOM.createPortal(modal,modalRoot) : <></>
}

export default ModalOverlay;