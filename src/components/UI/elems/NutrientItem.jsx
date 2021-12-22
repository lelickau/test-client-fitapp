import React from 'react';

import './elems.scss';

function NutrientItem({color, measure, value, title}) {

    const colorNutrients = {
        'crabs': {background: '#62CF58'},
        'protein': {background: '#F1B04A'},
        'fat': {background: '#6263D5'},
        'energy': {background: '#FFEE51'},
        'fiber': {background: '#996D2B'},
    }
    return (
        <div className="nutrient">
            <div className="nutrient__color" style={colorNutrients[color]}></div>
            <div className="nutrient__title">{title}:</div>
            <div className="nutrient__text"><span>{value}</span><span>{measure ? measure : 'g'}</span></div>
        </div>
    );
}

export default NutrientItem;