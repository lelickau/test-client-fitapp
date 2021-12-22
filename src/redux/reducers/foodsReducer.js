const GET__FOOD = 'GET__FOOD';
const ADD__FOOD = 'ADD__FOOD';
const GET__FOODS = 'GET__FOODS';
const SET__FAVORITE = 'SET__FAVORITE';
const DELETE__FAVORITE = 'DELETE__FAVORITE';
const CLEAN__FOOD__LIST = 'CLEAN__FOOD__LIST';

const foodsState = {
    searchFoodList: [],
    favoritList: [],
    isError: false,
}

export default function foodsReducer (state = foodsState, action) {
    switch (action.type) {
        case CLEAN__FOOD__LIST:
            return {...state, searchFoodList: []}

        case GET__FOOD:
            return {...state, searchFoodList: [...action.payload], isError: false}

        case ADD__FOOD:
            return {...state, favoritList: [...state.favoritList, action.payload]}

        case GET__FOODS:
            return {...state, favoritList: [...action.payload]}

        case DELETE__FAVORITE:
            return {...state, favoritList: [...state.favoritList.filter(item => item._id !== action.payload)]}

        case SET__FAVORITE:
            return {...state, searchFoodList: [...state.searchFoodList.map(food => {
                if (food.foodId === action.payload) {
                    return {...food, searchFood: !food.searchFood}
                }
                return {...food}
            })]}

        default:
            return state;
    }
}

export const searchFoodAC = (foods) => ({type: 'GET__FOOD', payload: foods});
export const addFoodAC = (food) => ({type: 'ADD__FOOD', payload: food});
export const getFoodsAC = (foods) => ({type: 'GET__FOODS', payload: foods});
export const setFavoriteAC = (id) => ({type: 'SET__FAVORITE', payload: id});
export const deleteFavsFoodAC = (id) => ({type: 'DELETE__FAVORITE', payload: id});
export const cleanFoodListAC = () => ({type: 'CLEAN__FOOD__LIST'});
