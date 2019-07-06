import { combineReducers } from "redux";

const allSkillsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_SKILLS':
            return action.payload;
        default:
            return state;
    }
}

const skillsForOneJobReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SKILLS_FOR_ONE_JOB':
            return action.payload;
        default:
            return state;
    }
}

const topSkillsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOP_SKILLS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    allSkillsReducer,
    skillsForOneJobReducer,
    topSkillsReducer,
});