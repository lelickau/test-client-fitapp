import axios from "axios";
import { setErrorAC, setSuccessAC, changeLoadingAC } from "../reducers/globalReducer";
import { setUserAC, logoutAC, errorAuthAC, updateUserAC } from "../reducers/userReducer";
import { API_URL_AUTH } from "../../env";
import AuthService from "../../services/AuthServices";

export const registration = ({email, password}) => {
    return async dispatch => {
        dispatch(changeLoadingAC(true));
        try {
            const correctEmail = email.toLowerCase();
            const response = await AuthService.registration(correctEmail, password);
            dispatch(setSuccessAC(true));
            dispatch(setUserAC(response.data.user));
            localStorage.setItem('token', response.data.accessToken);
        } catch (err) {
            dispatch(errorAuthAC(err.response.data.message));
            console.log(err?.response?.data?.message);
        } finally {
            dispatch(changeLoadingAC(false));
        }
    }
}

export const login = ({email, password}) => {
    return async dispatch => {
        dispatch(changeLoadingAC(true));
        try {
            const correctEmail = email.toLowerCase();
            const response = await AuthService.login(correctEmail, password);

            dispatch(setUserAC(response.data.user));
            localStorage.setItem('token', response.data.accessToken);
        } catch (err) {
            dispatch(errorAuthAC(err.response.data.message));
            console.log(err?.response?.data?.message);
        } finally {
            dispatch(changeLoadingAC(false));
        }
    }
}

export const logout = () => {
    return async dispatch => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            dispatch(logoutAC());
        } catch (err) {
            dispatch(errorAuthAC(err.response.data.message));
            console.log(err?.response?.data?.message);
        }
    }
}

export const authentication = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL_AUTH}refresh`, {withCredentials: true});
            dispatch(setUserAC(response.data.user));
            localStorage.setItem('token', response.data.accessToken);
        } catch (err) {
            localStorage.removeItem('token');
            console.log(err?.response?.data?.message);
        }
    }
}

export const uploadAvatar =  (file) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL_AUTH}avatar`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(updateUserAC(response.data.user.avatar));
        } catch (err) {
            dispatch(errorAuthAC(err.response.data.message));
            console.log(err?.response?.data?.message);
        }
    }
}

export const deleteAvatar =  () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL_AUTH}avatar`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(updateUserAC(response.data.user.avatar));
        } catch (err) {
            dispatch(errorAuthAC(err.response));
            console.log(err?.response?.data?.message);
        }
    }
}

// reset password
export const reset = ({email}) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL_AUTH}reset`, {email});
            if (response.status === 200) {
                dispatch(setSuccessAC(response.data.email))
            }
        } catch (err) {
            dispatch(setErrorAC(err.response.data.message));
            console.log(err);
        }
    }
}

export const updatePassword = ({password}, token) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL_AUTH}update/${token}`, {password});
            if (response.status === 200) {
                dispatch(setSuccessAC(true))
            }
        } catch (err) {
            dispatch(setErrorAC(err.response.data.message));
            console.log(err?.response?.data?.message);
        }
    }
}