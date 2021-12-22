const SET_USER = "SET_USER";
const UPDATE__USER = "UPDATE__USER";
const LOGOUT = "LOGOUT";
const ERROR_AUTH = "ERROR_AUTH";

const userState = {
    currentUser: {},
    isAuth: false,
    isError: null,
}

export default function userReducer (state = userState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            }
        case UPDATE__USER:
            return {
                ...state,
                currentUser: {...state.currentUser, avatar: action.payload},
                isAuth: true,
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            }
        case ERROR_AUTH:
            return {
                ...state,
                isError: action.payload,
            }
        default:
            return state;
    }

}

// action creator
export const setUserAC = (user) => ({type: SET_USER, payload: user});
export const updateUserAC = (user) => ({type: UPDATE__USER, payload: user});
export const logoutAC = () => ({type: LOGOUT});
export const errorAuthAC = (error) => ({type: ERROR_AUTH, payload: error});

