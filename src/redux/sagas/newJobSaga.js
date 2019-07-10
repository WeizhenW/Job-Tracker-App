import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* postNewJob(action) {
    const postNewJobResponse = yield axios.post('/api/job/new', action.payload.job);
    // yield action.payload.history.push(`/job-list/detail/${postNewJobResponse.data.id}`);
}



function* newJobSaga() {
    yield takeLatest('POST_NEW_JOB', postNewJob);
  }
  
  export default newJobSaga;