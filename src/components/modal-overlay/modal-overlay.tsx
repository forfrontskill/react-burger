import React from "react";

import style from './modal-overlay.module.css';

type Props = {
    onClick: () => void
}

const ModalOverlay = ({ onClick }: Props) => <div className={style.ModalOverlay} onClick={onClick}></div>


export default ModalOverlay;