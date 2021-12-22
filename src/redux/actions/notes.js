import axios from "axios";
import { changeHiddenAC, errorAC, changeLoadingAC } from "../reducers/globalReducer";
import { getNotesAC, deleteNoteAC, editNoteAC, createNoteAC, updateEditNoteAC, cleanEditNoteAC } from "../reducers/notesReducer";
import { API_URL_NOTES } from "../../env";

export const createNote = ({title, description, marking, status}) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL_NOTES}create`, {title, description, marking, status}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(createNoteAC(response.data));
        } catch (err) {
            dispatch(errorAC(err.response.data.message));
            console.log(err.response.data.message);
        }
    }

}

export const getNotes = () => {
    return async dispatch => {
        dispatch(changeLoadingAC(true));
        try {
            const response = await axios.get(`${API_URL_NOTES}getall`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(getNotesAC(response.data));
        } catch (err) {
            console.log(err?.response?.data?.message);
        } finally {
            dispatch(changeLoadingAC(false));
        }
    }
}
export const deleteFile = (task) => {
    return async dispatch => {
        try {
            await axios.delete(`${API_URL_NOTES}delete?id=${task._id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(deleteNoteAC(task._id));
        } catch (err) {
            console.log(err?.response?.data?.message);
        }
    }
}


export const updateEditNote = ({title, description, marking, status}, id) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${API_URL_NOTES}edit/${id}`, {title, description, marking, status}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(updateEditNoteAC(response.data));
        } catch (err) {
            dispatch(errorAC(err.response.data.message));
            console.log(err?.response?.data?.message);
        }
    }
}

export const updateCompletedNote = (task, id) => {
    return async dispatch => {
        try {
            const newTask = {...task, completed: !task.completed};
            const response = await axios.put(`${API_URL_NOTES}edit/${id}`, newTask, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(updateEditNoteAC(response.data));
        } catch (err) {
            dispatch(errorAC(err.response.data.message));
            console.log(err?.response?.data?.message);
        }
    }
}

export const editNote = (task) => {
    return dispatch => {
        dispatch(editNoteAC(task));
        dispatch(changeHiddenAC(false));
    }
}

export const cleanEditNote = () => {
    return dispatch => {
        dispatch(cleanEditNoteAC());
    }
}

