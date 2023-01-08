import React, { FC,useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from 'react-dom';

import style from './modal.module.css';

const modalRoot = document.getElementById('react-modals') || document.createElement("react-modals");;

type Props = {
    title?: string;
    onClose: () => void;
}

const Modal:FC<Props> = ({ title, onClose, children }) => {

    useEffect(() => {
        const eventEscKey = (evt:KeyboardEvent) => {
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

export default Modal;