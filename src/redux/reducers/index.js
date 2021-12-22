import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import notesReducer from './notesReducer';
import userReducer from './userReducer';
import initializeReducer from './initializeReducer';
import foodsReducer from './foodsReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
    user: userReducer,
    notes: notesReducer,
    initializedApp: initializeReducer,
    foods: foodsReducer,
    global: globalReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer, composedEnhancer);