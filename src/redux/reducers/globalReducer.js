const IS__ERROR = 'IS__ERROR';
const SET__ERROR = 'SET__ERROR';
const SET__SUCCESS = 'SET__SUCCESS';
const CHANGE__LOADING = 'CHANGE__LOADING';
const CHANGE__HIDDEN = 'CHANGE__HIDDEN';

const globalState = {
    isLoading: false,
    isError: false,
    isHidden: true,
    isSuccess: null
}

export default function foodsReducer (state = globalState, action) {
    switch (action.type) {
        case IS__ERROR:
            return {...state, isError: action.payload}

        case SET__ERROR:
            return {...state, isError: action.payload}

        case SET__SUCCESS:
            return {...state, isSuccess: action.payload}

        case CHANGE__LOADING:
            return {...state, isLoading: action.payload}

        case CHANGE__HIDDEN:
            return {...state, isHidden: action.payload}

        default:
            return state;
    }
}

export const errorAC = (val) => ({type: 'IS__ERROR', payload: val});
export const setErrorAC = (val) => ({type: 'SET__ERROR', payload: val});
export const setSuccessAC = (val) => ({type: 'SET__SUCCESS', payload: val});
export const changeHiddenAC = (val) => ({type: 'CHANGE__HIDDEN', payload: val});
export const changeLoadingAC = (val) => ({type: 'CHANGE__LOADING', payload: val});
