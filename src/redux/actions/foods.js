import axios from "axios";
import {API_FOOD_URL, MY_API_URL_FOODS} from '../../env';
import {searchFoodAC, cleanFoodListAC, addFoodAC, getFoodsAC, setFavoriteAC, deleteFavsFoodAC} from '../reducers/foodsReducer';
import { changeHiddenAC, changeLoadingAC, errorAC } from "../reducers/globalReducer";


function FormationDataFood (objFood, weight = 100){
    const {food} = objFood;
    this.label = food.label;
    this.CHOCDF = 'CHOCDF' in food.nutrients ? ((food.nutrients.CHOCDF)*weight/100).toFixed(1) : 0;
    this.PROCNT = 'PROCNT' in food.nutrients ? ((food.nutrients.PROCNT)*weight/100).toFixed(1) : 0;
    this.FAT = 'FAT' in food.nutrients ? ((food.nutrients.FAT)*weight/100).toFixed(1) : 0;
    this.ENERC_KCAL = 'ENERC_KCAL' in food.nutrients ? ((food.nutrients.ENERC_KCAL)*weight/100).toFixed(1) : 0;
    this.FIBTG =  'FIBTG' in food.nutrients ? ((food.nutrients.FIBTG)*weight/100).toFixed(1) : 0;
    this.searchFood = false;
    this.foodId = food.foodId;
    this.scale = weight;
}

function unDublicate(arr, propertyName) {
    if ((Array.isArray(arr) || arr instanceof Array)
    && arr.length
    && typeof propertyName === 'string'
    && propertyName.length) {
        const arrayFromKey = arr.map(item => item.food[propertyName]);

        const strarr = arrayFromKey.filter((currentVal, ind) => {
            return arrayFromKey.indexOf(currentVal) === ind
        });

        return strarr.map(key => arr.find(item => item.food[propertyName] === key))
    }
}

function findIdFoods(arr, propertyName) {
    return arr.map(item => item[propertyName]);
}

export const searchFood = (food, favsList, weight) => {
    return async dispatch => {
        dispatch(changeLoadingAC(true))
        try {
            const response = await axios.get(`${API_FOOD_URL}&ingr=${food}`);

            if (!response.data.hints.length) {
                dispatch(errorAC(true));
                dispatch(cleanFoodListAC());

            } else {
                const dataFoods = unDublicate(response.data.hints, 'foodId');

                const dataFoodsStore = dataFoods.map(item => new FormationDataFood(item, weight));

                const favsFoodIds = findIdFoods(favsList, 'foodId');
                const finalyFoodData = dataFoodsStore.map(el => {
                    for (let item of favsFoodIds) {
                        if (el.foodId === item) {
                            return {...el, searchFood: true}
                        }
                    }
                    return {...el}
                });
                dispatch(searchFoodAC(finalyFoodData));
            }
        } catch (err) {
            console.log(err.response.data.message);
        } finally {
            dispatch(changeLoadingAC(false));
        }
    }
}

export const setFavorite = (foodId) => {
    return dispatch => {
        dispatch(setFavoriteAC(foodId));
    }
}

export const addFood = (food) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${MY_API_URL_FOODS}create`, food, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(addFoodAC(response.data));
            dispatch(changeHiddenAC(true));
        } catch (err) {
            dispatch(errorAC(err.response.data.message));
            console.log(err.response.data.message);
        }
    }
}

export const getFoods = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${MY_API_URL_FOODS}getfoods`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(getFoodsAC(response.data));
        } catch (err) {
            console.log(err.response.data.message);
        }
    }
}

export const deleteFavsFood = (idFood) => {
    return async dispatch => {
        try {
            await axios.delete(`${MY_API_URL_FOODS}delete?id=${idFood}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(deleteFavsFoodAC(idFood));
        } catch (err) {
            console.log(err.response.data.message);
        }
    }
}

