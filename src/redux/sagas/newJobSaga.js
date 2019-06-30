import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* postNewJob(action) {
    yield axios.post('/api/job/new', action.payload);
    // yield put({
    //     type: 'GET_NEW_JOBS_LIST',
    // })
}



function* newJobSaga() {
    yield takeLatest('POST_NEW_JOB', postNewJob);
  }
  
  export default newJobSaga;