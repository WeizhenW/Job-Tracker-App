import { combineReducers } from "redux";

const searchByCompanyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_BY_COMPANY_RESULTS':
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
    searchByCompanyReducer,
});