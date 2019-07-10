import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* fetchAllStatus() {
    try {
        const allStatusResponse = yield axios.get('/api/status');
        yield put({
            type: 'SET_ALL_STATUS',
            payload: allStatusResponse.data,
        })
    } catch(error) {
        console.log('error with fetch all status', error);
    }
}

//generator to update job status and the status date
function* updateJobStatus(action) {
    try {
        yield axios.put(`/api/status/${action.payload.job_id}`, action.payload);
        yield put({type: 'FETCH_NEW_JOBS_LIST'});
        yield put({type: 'FETCH_APPLIED_JOBS_LIST'});
        yield put({type: 'FETCH_FOLLOW_UP_LIST'});
    } catch(error) {
        console.log('error with update job status', error);
    }
}

//generator to update job status date ONLY
function* updateStatusDate(action) {
    try {
        yield axios.put(`/api/status/${action.payload.job_id}`);
        yield put({type: 'FETCH_FOLLOW_UP_LIST'});
    } catch(error) {
        console.log('error with update status date', error);
    }
}

//watcher saga
function* jobStatusSaga() {
    yield takeEvery('FETCH_ALL_STATUS', fetchAllStatus);
    yield takeEvery('UPDATE_JOB_STATUS', updateJobStatus);
    yield takeEvery('UPDATE_STATUS_DATE', updateStatusDate);
}
  
export default jobStatusSaga;