import React from 'react';

import './buttonItem.scss';

const ButtonItem = ({children, ...props}) => {
    return (
        <button className="main-btn" {...props}>{children}</button>
    );
};

export default ButtonItem;