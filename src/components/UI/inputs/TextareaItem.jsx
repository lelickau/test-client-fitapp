import React from 'react';
import style from './InputItem.module.css';
const TextareaItem = React.forwardRef(({...props}, ref) => {
    return (
        <textarea
            ref={ref}
            className={style.mainTextarea}
            {...props}
        ></textarea>
    );
});

export default TextareaItem;