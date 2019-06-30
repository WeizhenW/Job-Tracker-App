const statusReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_ALL_STATUS':
            return action.payload;
        default:
            return state;
    }
}

export default statusReducer;