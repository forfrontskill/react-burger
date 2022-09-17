import React from "react";
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => <div className={style.ModalOverlay} onClick={onClick}></div>

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;