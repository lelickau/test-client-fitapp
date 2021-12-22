import React from 'react';

import './headerTitle.scss';

function HeaderTitle({children, ...props}) {
    return (
        <div className="header">
            <h1 className="header__title" {...props}>{children}</h1>
        </div>
    );
}

export default HeaderTitle;