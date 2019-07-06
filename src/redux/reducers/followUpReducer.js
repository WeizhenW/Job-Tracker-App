import { combineReducers } from "redux";

const followUpReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FOLLOW_UP_LIST':
            return action.payload;
        default:
            return state;
    }
}

// const skillsForOneJobReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_SKILLS_FOR_ONE_JOB':
//             return action.payload;
//         default:
//             return state;
//     }
// }

export default combineReducers({
    followUpReducer,
});