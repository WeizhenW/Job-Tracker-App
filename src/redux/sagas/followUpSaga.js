import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllFollowUps() {
    const allFollowUpResponse = yield axios.get('/api/followup');
    yield put({
        type: 'SET_FOLLOW_UP_LIST',
        payload: allFollowUpResponse.data,
    })
}

function* updateFollowUpMode(action) {
    yield axios.put('/api/followup', action.payload);
    yield put({
        type: 'FETCH_FOLLOW_UP_LIST',
    })
}




function* followUpSaga() {
    yield takeEvery('FETCH_FOLLOW_UP_LIST', fetchAllFollowUps);
    yield takeEvery('UPDATE_FOLLOW_UP_MODE', updateFollowUpMode);

  }
  
  export default followUpSaga;