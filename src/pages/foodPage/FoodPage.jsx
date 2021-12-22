import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalLoader from '../../components/loader/LocalLoader';
import FoodItem from '../../components/foodItem/FoodItem';
import HeaderTitle from '../../components/headerTitle/HeaderTitle';
import MyFoodList from '../../components/myFoodList/MyFoodList';
import SearchFood from '../../components/searchFood/SearchFood';
import { getFoods } from '../../redux/actions/foods';

import './foodPage.scss';

function FoodPage() {
    const dispatch = useDispatch()
    const allSearchedFoods = useSelector(state => state.foods.searchFoodList);
    const isError = useSelector(state => state.global.isError);
    const isLoading = useSelector(state => state.global.isLoading);

    const [hiddenContent, setHiddenContent] = useState(false);
    const widthScreen = window.innerWidth;

    useEffect(() => {
        dispatch(getFoods())
    }, [dispatch]);

    const showSearchContent = (e) => {
        e.preventDefault();
        setHiddenContent(false);
    }
    const showFavsContent = (e) => {
        e.preventDefault();
        setHiddenContent(true);
    }

    return (
        <div className="food">
            <HeaderTitle>Food</HeaderTitle>
            <div className={widthScreen < 1001 ? "food__tab-btns" : "hidden"}>
                <button className={!hiddenContent ? "food__tab-btn food__tab-btn--active" : "food__tab-btn"} onClick={showSearchContent}>Search</button>
                <button className={hiddenContent ? "food__tab-btn food__tab-btn--active" : "food__tab-btn"} onClick={showFavsContent}>My Favs</button>
            </div>
            <article className="food__content container">
                <div className={hiddenContent ? "food__serach hidden" : "food__serach"}>
                    <SearchFood/>
                    <div className="food__serach-items">
                        {isLoading ? <div className="food__serach-loader"><LocalLoader/></div> : ""}
                        {!allSearchedFoods.length && isError
                        ? <div className="food__serach-error">Nothing was found for your query. Try again.</div>
                        : allSearchedFoods.map((item) => <FoodItem key={item.foodId} foods={item} />)
                    }
                    </div>
                </div>
                <div
                    className={widthScreen < 1001 ? `food__add-create ${!hiddenContent ? 'hidden' : ''}` : "food__add-create"}>
                    <MyFoodList/>
                </div>
            </article>
        </div>
    );
}

export default FoodPage;