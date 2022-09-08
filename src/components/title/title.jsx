import React from "react";
import PropTypes from 'prop-types';

const Title = ({text}) => {
    return <h1 className="text text_type_main-large">{text}</h1>
}

Title.propTypes = {
    text: PropTypes.string
}

export default Title;