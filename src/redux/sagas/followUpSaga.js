import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllFollowUps() {
    try {
        const allFollowUpResponse = yield axios.get('/api/followup');
        yield put({
            type: 'SET_FOLLOW_UP_LIST',
            payload: allFollowUpResponse.data,
        })
    } catch(error) {
        console.log('error with fetch all follow ups', error);
    }
    
}

function* updateFollowUpMode(action) {
    try {
        yield axios.put('/api/followup', action.payload);
        yield put({
            type: 'FETCH_FOLLOW_UP_LIST',
        })
    } catch (error) {
        console.log('error with update follow up mode', error);
    }  
}
//watcher saga
function* followUpSaga() {
    yield takeEvery('FETCH_FOLLOW_UP_LIST', fetchAllFollowUps);
    yield takeEvery('UPDATE_FOLLOW_UP_MODE', updateFollowUpMode);
  }
  
  export default followUpSaga;