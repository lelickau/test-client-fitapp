import React, { useState } from 'react';
import InputItem from '../UI/inputs/InputItem';
import ButtonItem from '../UI/buttons/ButtonItem';
import PlusElem from '../UI/elems/PlusMinusElem';
import { useDispatch, useSelector } from 'react-redux';
import {searchFood} from '../../redux/actions/foods';

import plusIco from '../../resources/icons/addTask.svg';
import minusIco from '../../resources/icons/minus.svg';
import searchIco from '../../resources/icons/search.svg';
import './searchFood.scss';

function SearchFood() {
    const dispatch = useDispatch();
    const favsList = useSelector(state => state.foods.favoritList);

    const [inputValue, setInputValue] = useState('');
    const [weight, setWeight] = useState(100);

    const increaseWeight = (e) => {
        setWeight(+weight + 1);
    }

    const reduceWeight = (e) => {
        +weight < 2 ? setWeight(1) : setWeight(+weight - 1)
    }

    const setDefaultWeight = (e) => {
        setWeight(e.target.dataset.waigth);
    }

    const changeHandler = (e) => {
        setInputValue(e.target.value.trim());
    }
    const handlePressKey = (e) => {
        if (e.key === 'Enter') {
            dispatch(searchFood(inputValue, favsList, weight));
            setInputValue('');
        }
    }

    const getFoodsItem = (e) => {
        e.preventDefault();
        dispatch(searchFood(inputValue, favsList, weight));
        setInputValue('');
    }

    return (
        <div className="search-food">
            <label className="search-food__title">Search an ingredient
                <div className="search-food__input-box">
                    <InputItem
                        type="text"
                        onChange={changeHandler}
                        placeholder="lemon"
                        value={inputValue}
                        name="foodName"
                        onKeyPress={handlePressKey}
                        />
                    <div className="search-food__btn-box">
                        <ButtonItem
                            onClick={getFoodsItem}
                        ><span className="search-food__btn-title">Search</span>
                        <img className="search-food__btn-ico" src={searchIco} alt="Search" />
                        </ButtonItem>
                    </div>
                </div>
                <div className="search-food__choose-weight">
                    <PlusElem onClick={reduceWeight} alt="minus" src={minusIco}/>
                    <label className="search-food__weight">
                        <span>{weight}</span>
                        <span>g</span>
                    </label>
                    <PlusElem onClick={increaseWeight} alt="plus" src={plusIco}/>
                </div>
                <div className="search-food__choose-weight">
                    <div onClick={setDefaultWeight} data-waigth="350" className="search-food__weight-item">350</div>
                    <div onClick={setDefaultWeight} data-waigth="500" className="search-food__weight-item">500</div>
                    <div onClick={setDefaultWeight} data-waigth="700" className="search-food__weight-item">700</div>
                    <div onClick={setDefaultWeight} data-waigth="1000" className="search-food__weight-item">1000</div>
                </div>
            </label>
        </div>
    );
}

export default SearchFood;