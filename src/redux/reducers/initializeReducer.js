import { authentication } from "../actions/user";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

let initialState = {
    initialized: false,
};

const initialReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS});


export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(authentication());

        Promise.all([promise]).then(() => {dispatch(initializedSuccessAC())});
    }
}

export default initialReducer;