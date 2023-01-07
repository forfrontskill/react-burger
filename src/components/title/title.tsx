import React from "react";
import PropTypes from 'prop-types';

type Props = {
    text: string;
}

const Title = ({text}: Props) => {
    return (<h1 className="text text_type_main-large">{text}</h1>);
}

Title.propTypes = {
    text: PropTypes.string.isRequired
}

export default Title;