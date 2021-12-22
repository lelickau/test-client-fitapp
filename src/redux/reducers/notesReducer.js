const GET__NOTES = 'GET__NOTES';
const DELETE__NOTE = 'DELETE__NOTE';
const EDIT__NOTE = 'EDIT__NOTE';
const CLEAN__EDIT__NOTE = 'CLEAN__EDIT__NOTE';
const UPDATE__NOTE = 'UPDATE__NOTE';
const CREATE__NOTE = 'CREATE__NOTE';
const CHANGE__LOADING = 'CHANGE__LOADING';

const notesState = {
    notesList: [],
    editNote: [],
    isLoading: false
};

export default function notesReducer (state = notesState, action) {
    switch (action.type) {
        case GET__NOTES:
            return {...state, notesList: [...action.payload]}

        case CREATE__NOTE:
            return {...state, notesList: [...state.notesList, action.payload]}

        case DELETE__NOTE:
            return {...state, notesList: state.notesList.filter(note => note._id !== action.payload)}

        case EDIT__NOTE:
            return {...state, editNote: [action.payload]}

        case CLEAN__EDIT__NOTE:
            return {...state, editNote: []}

        case UPDATE__NOTE:
            return {...state, notesList: state.notesList.map((note) =>  (note._id === action.payload._id ? action.payload : note)), editNote: []}


        case CHANGE__LOADING:
            return {...state, isLoading: action.payload}

        default:
            return state;
    }

}

export const getNotesAC = (notes) => ({type: GET__NOTES, payload: notes});
export const createNoteAC = (note) => ({type: CREATE__NOTE, payload: note});
export const deleteNoteAC = (noteId) => ({type: DELETE__NOTE, payload: noteId});
export const editNoteAC = (task) => ({type: EDIT__NOTE, payload: task});
export const cleanEditNoteAC = () => ({type: CLEAN__EDIT__NOTE});
export const updateEditNoteAC = (task) => ({type: UPDATE__NOTE, payload: task});
export const changeLoadingAC = (val) => ({type: CHANGE__LOADING, payload: val});