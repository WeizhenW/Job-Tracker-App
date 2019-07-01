const newJobsListReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_NEW_JOBS_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default newJobsListReducer;