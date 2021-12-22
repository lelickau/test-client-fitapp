import React from 'react';

import './foodItem.scss';
import starEmpty from '../../resources/icons/star-empty.svg';
import starFill from '../../resources/icons/star-fill.svg';
import NutrientItem from '../UI/elems/NutrientItem';
import { useDispatch, useSelector } from 'react-redux';
import { addFood, setFavorite } from '../../redux/actions/foods';

function FoodItem({foods}) {

    const favsList = useSelector(state => state.foods.favoritList);
    const dispatch = useDispatch();

    const addSearchFood = (e) => {
        e.preventDefault();
        console.log(foods);
        if (favsList.length && favsList.find(item => item.foodId === foods.foodId)) {
            return 0
        }
        dispatch(addFood(foods));
        dispatch(setFavorite(foods.foodId));
    }

    return (
        <article className="food-item">
            <div className="food-item__title-box">
                <button className="food-item__star-btn" onClick={addSearchFood}>
                    <img className="food-item__star" src={!foods.searchFood ? starEmpty : starFill} alt="Save" />
                </button>
                <h3 className="food-item__title">{foods.label}</h3>
            </div>
            <div className="food-item__nutrients">
                <div className="food-item__nutrients-item">
                    <NutrientItem value={foods.CHOCDF} title={'Crabs'} color={'crabs'}/>
                    <NutrientItem value={foods.PROCNT} title={'Protein'} color={'protein'}/>
                    <NutrientItem value={foods.FAT} title={'Fat'} color={'fat'}/>
                </div>
                <div className="food-item__nutrients-item">
                    <NutrientItem value={foods.ENERC_KCAL} title={'Energy'} color={'energy'} measure={'kcal'}/>
                    <NutrientItem value={foods.FIBTG} title={'Fiber'} color={'fiber'} />
                </div>
            </div>
                <div className="food-item__weight">Per {foods.scale}g of product</div>
        </article>
    );
}

export default FoodItem;