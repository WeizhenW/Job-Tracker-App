import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all new jobs
function* fetchNewJobsList() {
    try {
        const allNewJobs = yield axios.get('/api/job/toapply');
        yield put({
            type: 'SET_NEW_JOBS_LIST',
            payload: allNewJobs.data,
        })
    } catch(error) {
        console.log('error with fetch new job list', error);
    } 
}

//generator to get all applied jobs
function* fetchAppliedJobsList() {
    try {
        const allAppliedJobs = yield axios.get('/api/job/applied');
        yield put({
            type: 'SET_APPLIED_JOBS_LIST',
            payload: allAppliedJobs.data,
        })
    } catch(error) {
        console.log('error with fetch applied job list', error);
    }
}

//generator to delete one job
function* deleteJob(action) {
    try {
        yield axios.delete(`/api/job/delete/${action.payload.id}`);
        if(action.payload.status_id === 1) {
            yield put({type: 'FETCH_NEW_JOBS_LIST'});
        } else {
            yield put({type: 'FETCH_APPLIED_JOBS_LIST'});
        }
    } catch(error) {
        console.log('error with delete job', error);
    }
}

//generator to get one job detail
function* fetchOneJobDetail(action) {
    try {
        const oneJobDetailResponse = yield axios.get(`/api/job/${action.payload.id}`);
        yield put({type: 'SET_ONE_JOB_DETAIL', payload: oneJobDetailResponse.data});
    } catch(error) {
        console.log('error with fetch one job detail', error);
    }
}

//generator to update the job detail
function* updateJobDetail (action) {
    try { 
        yield axios.put('/api/job/edit', action.payload);
        yield put({type: 'FETCH_ONE_JOB_DETAIL', payload: {id: action.payload.job_id}});
    } catch(error) {
        console.log('error with update job detail', error);
    }
}

//generator to get all the jobs
function* fetchAllJobs () {
    try {
        const allJobsResponse = yield axios.get('/api/job');
        yield put({type: 'SET_ALL_JOBS', payload: allJobsResponse.data});
    } catch(error) {
        console.log('error with fetch all jobs', error);
    }
}
//watcher saga
function* jobListSaga() {
    yield takeEvery('FETCH_NEW_JOBS_LIST', fetchNewJobsList);
    yield takeEvery('DELETE_JOB', deleteJob);
    yield takeEvery('FETCH_APPLIED_JOBS_LIST', fetchAppliedJobsList);
    yield takeEvery('FETCH_ONE_JOB_DETAIL', fetchOneJobDetail);
    yield takeEvery('UPDATE_JOB_DETAIL', updateJobDetail);
    yield takeEvery('FETCH_ALL_JOBS', fetchAllJobs);

  }
  
  export default jobListSaga;