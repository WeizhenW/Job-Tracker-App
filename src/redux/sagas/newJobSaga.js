import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* postNewJob(action) {
    const postNewJobResponse = yield axios.post('/api/job/new', action.payload);
    console.log(postNewJobResponse.data);
    yield put({
        type: 'SET_NEW_JOB_ID',
        payload: postNewJobResponse.data,
    })
}



function* newJobSaga() {
    yield takeLatest('POST_NEW_JOB', postNewJob);
  }
  
  export default newJobSaga;