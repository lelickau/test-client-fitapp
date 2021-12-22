import { changeHiddenAC, errorAC, setErrorAC} from "../reducers/globalReducer";

export const changeHidden = (val) => {
    return dispatch => {
        dispatch(changeHiddenAC(val));
    }
}

export const cleanIsError = (val) => {
    return dispatch => {
        dispatch(errorAC(val));
    }
}

export const setIsError = (val) => {
    return dispatch => {
        dispatch(setErrorAC(val));
    }
}
