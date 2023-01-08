import React from "react";

type Props = {
    text: string;
}

const Title = ({text}: Props) => {
    return (<h1 className="text text_type_main-large">{text}</h1>);
}

export default Title;