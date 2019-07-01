import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* fetchNewJobsList() {
    const allNewJobs = yield axios.get('/api/job/toapply');
    yield put({
        type: 'SET_NEW_JOBS_LIST',
        payload: allNewJobs.data,
    })
}
//generator to delete one job
function* deleteJob(action) {
    yield axios.delete(`/api/job/delete/${action.payload.id}`);
    yield put({type: 'FETCH_NEW_JOBS_LIST'});
}



function* jobListSaga() {
    yield takeLatest('FETCH_NEW_JOBS_LIST', fetchNewJobsList);
    yield takeLatest('DELETE_JOB', deleteJob);

  }
  
  export default jobListSaga;