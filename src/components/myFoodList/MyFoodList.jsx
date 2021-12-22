import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlusMinusElem from '../UI/elems/PlusMinusElem';
import MyFoodItem from '../myFoodItem/MyFoodItem';
import CreateMyFoodItem from '../createMyFoodItem/CreateMyFoodItem'

import './myFoodList.scss';
import plusIco from '../../resources/icons/addTask.svg';
import { changeHidden } from '../../redux/actions/global';

function MyFoodList() {
    const dispatch = useDispatch();
    const myFavoritList = useSelector(state => state.foods.favoritList);
    const hiddenCreate = useSelector(state => state.global.isHidden);

    const openCreateFood = (e) => {
        e.preventDefault();
        dispatch(changeHidden(false))
    }

    return (
        <article className="food-list">
            <div className={`food-list__create-box ${hiddenCreate ? "hidden" : ""}`}>
                    <CreateMyFoodItem/>
                </div>
            <div className="food-list__title-box">
                <h1 className="food-list__title">My food</h1>
                <button
                    onClick={openCreateFood}
                    className="food-list__add">
                    <PlusMinusElem alt="Add" src={plusIco} />
                    <div className="food-list__add-title">Add food</div>
                </button>
            </div>
            <div className="food-list__content">
            {myFavoritList.length
            ? myFavoritList.map(food => <MyFoodItem key={food._id} myFood={food} />)
            : <></>
            }
            </div>
        </article>
    );
}

export default MyFoodList;