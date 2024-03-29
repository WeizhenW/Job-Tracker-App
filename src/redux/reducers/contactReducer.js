import { combineReducers } from "redux";

const contactReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTACT':
            return action.payload;
        default:
            return state;
    }
}

const contactOneJobReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTACT_FOR_ONE_JOB':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    contactReducer,
    contactOneJobReducer,
});