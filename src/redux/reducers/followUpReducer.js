import { combineReducers } from "redux";

const followUpReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FOLLOW_UP_LIST':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    followUpReducer,
});