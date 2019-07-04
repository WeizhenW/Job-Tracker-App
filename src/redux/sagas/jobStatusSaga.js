import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* fetchAllStatus() {
    const allStatusResponse = yield axios.get('/api/status');
    yield put({
        type: 'SET_ALL_STATUS',
        payload: allStatusResponse.data,
    })
}

//generator to update job status and the status date
function* updateJobStatus(action) {
    yield axios.put(`/api/status/${action.payload.job_id}`, action.payload);
    // if(action.payload.status_id !== 1) {
        yield put({type: 'FETCH_NEW_JOBS_LIST'});
    // } else {
        yield put({type: 'FETCH_APPLIED_JOBS_LIST'});
    // }
        yield put({type: 'FETCH_FOLLOW_UP_LIST'});
}

//generator to update job status date ONLY
function* updateStatusDate(action) {
    yield axios.put(`/api/status/${action.payload.job_id}`);
    yield put({type: 'FETCH_FOLLOW_UP_LIST'});
}


function* jobStatusSaga() {
    yield takeEvery('FETCH_ALL_STATUS', fetchAllStatus);
    yield takeEvery('UPDATE_JOB_STATUS', updateJobStatus);
    yield takeEvery('UPDATE_STATUS_DATE', updateStatusDate);

  }
  
  export default jobStatusSaga;