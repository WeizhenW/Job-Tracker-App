import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all new jobs
function* fetchNewJobsList() {
    const allNewJobs = yield axios.get('/api/job/toapply');
    yield put({
        type: 'SET_NEW_JOBS_LIST',
        payload: allNewJobs.data,
    })
}

//generator to get all applied jobs
function* fetchAppliedJobsList() {
    const allAppliedJobs = yield axios.get('/api/job/applied');
    yield put({
        type: 'SET_APPLIED_JOBS_LIST',
        payload: allAppliedJobs.data,
    })
}

//generator to delete one job
function* deleteJob(action) {
    yield axios.delete(`/api/job/delete/${action.payload.id}`);
    if(action.payload.status_id === 1) {
        yield put({type: 'FETCH_NEW_JOBS_LIST'});
    } else {
        yield put({type: 'FETCH_APPLIED_JOBS_LIST'});
    }
}

//generator to delete one job
function* fetchOneJobDetail(action) {
    const oneJobDetailResponse = yield axios.get(`/api/job/${action.payload.id}`);
    yield put({type: 'SET_ONE_JOB_DETAIL', payload: oneJobDetailResponse.data})
}

//generator to update the job detail
function* updateJobDetail (action) {
    yield axios.put('/api/job/edit', action.payload);
    yield put({type: 'FETCH_ONE_JOB_DETAIL', payload: action.payload});
}



function* jobListSaga() {
    yield takeEvery('FETCH_NEW_JOBS_LIST', fetchNewJobsList);
    yield takeEvery('DELETE_JOB', deleteJob);
    yield takeEvery('FETCH_APPLIED_JOBS_LIST', fetchAppliedJobsList);
    yield takeEvery('FETCH_ONE_JOB_DETAIL', fetchOneJobDetail);
    yield takeEvery('UPDATE_JOB_DETAIL', updateJobDetail);

  }
  
  export default jobListSaga;