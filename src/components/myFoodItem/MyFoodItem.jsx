import React, { useState } from 'react';
import NutrientItem from '../UI/elems/NutrientItem';

import trashIco from '../../resources/icons/trash.svg';
import './myFoodItem.scss';
import { useDispatch } from 'react-redux';
import { deleteFavsFood, setFavorite } from '../../redux/actions/foods';

function MyFoodItem(myFood) {
    const dispatch = useDispatch()
    const [visibility, setVisibility] = useState(false);

    const openFoodItem = (e) => {
        setVisibility(!visibility);
    }

    const deleteFavFood = (e) => {
        e.stopPropagation();
        dispatch(deleteFavsFood(myFood.myFood._id));
        dispatch(setFavorite(myFood.myFood.foodId));
    }

    return (
        <article className="my-food">
            <div
                className="my-food__title-box"
                onClick={openFoodItem}
            >
            <button className="my-food__delete-btn" onClick={deleteFavFood}>
                <img className="my-food__marking" src={trashIco} alt="Favs" />
            </button>
                <h3 className="my-food__title">{myFood.myFood.label}</h3>
                <span className={`my-food__arrow ${visibility ? 'my-food__close' : 'my-food__open'}`}></span>
            </div>
            <div className={`my-food__content ${visibility ? "my-food__content--open" : "hidden-content"}` }>
                <div className="my-food__nutrients-box">
                    <div className="my-food__nutrients-item">
                        <NutrientItem value={myFood.myFood.CHOCDF} title={'Crabs'} color={'crabs'}/>
                        <NutrientItem value={myFood.myFood.PROCNT} title={'Protein'} color={'protein'}/>
                        <NutrientItem value={myFood.myFood.FAT} title={'Fat'} color={'fat'}/>
                    </div>
                    <div className="my-food__nutrients-item">
                        <NutrientItem value={myFood.myFood.ENERC_KCAL} title={'Energy'} color={'energy'} measure={'kcal'}/>
                        <NutrientItem value={myFood.myFood.FIBTG} title={'Fiber'} color={'fiber'} />
                    </div>
                </div>
                <div className="my-food__weight">Per {myFood.myFood.scale}g of product</div>
            </div>
        </article>
    );
}

export default MyFoodItem;