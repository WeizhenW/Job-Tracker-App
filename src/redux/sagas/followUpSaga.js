import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllFollowUps() {
    const allFollowUpResponse = yield axios.get('/api/followup');
    yield put({
        type: 'SET_FOLLOW_UP_LIST',
        payload: allFollowUpResponse.data,
    })
}




function* followUpSaga() {
    yield takeEvery('FETCH_FOLLOW_UP_LIST', fetchAllFollowUps);

  }
  
  export default followUpSaga;