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



function* jobListSaga() {
    yield takeLatest('FETCH_NEW_JOBS_LIST', fetchNewJobsList);
  }
  
  export default jobListSaga;