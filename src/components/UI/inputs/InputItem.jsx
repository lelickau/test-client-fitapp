import React from 'react';

import './inputItem.scss';

const InputItem = ({...props}) => {
    return (
        <input className="main-input" {...props} />
    );
};

export default InputItem;