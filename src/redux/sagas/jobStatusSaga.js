import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* fetchAllStatus() {
    const allStatusResponse = yield axios.get('/api/status');
    yield put({
        type: 'SET_ALL_STATUS',
        payload: allStatusResponse.data,
    })
}








function* jobStatusSaga() {
    yield takeLatest('FETCH_ALL_STATUS', fetchAllStatus);
  }
  
  export default jobStatusSaga;