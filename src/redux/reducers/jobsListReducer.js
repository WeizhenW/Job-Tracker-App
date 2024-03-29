import { combineReducers } from 'redux';

const newJobsListReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_NEW_JOBS_LIST':
            return action.payload;
        default:
            return state;
    }
}

const appliedJobsListReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_APPLIED_JOBS_LIST':
            return action.payload;
        default:
            return state;
    }
}

const jobDetailReducer = (state={}, action) => {
    switch(action.type) {
        case 'SET_ONE_JOB_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

const allJobsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_ALL_JOBS':
            return action.payload;
        default:
            return state;
    }
}

const newJobIdReducer = (state={}, action) => {
    switch(action.type) {
        case 'SET_NEW_JOB_ID':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    newJobsListReducer,
    appliedJobsListReducer,
    jobDetailReducer,
    newJobIdReducer,
    allJobsReducer,
}) 