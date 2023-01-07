import React from "react";
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css';

type Props = {
    onClick: () => void
}

const ModalOverlay = ({ onClick }: Props) => <div className={style.ModalOverlay} onClick={onClick}></div>

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;