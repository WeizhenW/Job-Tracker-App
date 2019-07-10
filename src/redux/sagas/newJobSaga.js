import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* postNewJob(action) {
    try {
        const postNewJobResponse = yield axios.post('/api/job/new', action.payload.job);
    } catch (error) {
        console.log('error with post new job', error);
    }
}

function* newJobSaga() {
    yield takeLatest('POST_NEW_JOB', postNewJob);
}

export default newJobSaga;