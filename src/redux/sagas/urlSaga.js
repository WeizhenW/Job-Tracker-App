import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* postUrl(action) {
    try {
        yield axios.post('/api/file', action.payload);
        yield put({type: 'FETCH_URL', payload: action.payload});
    } catch(error) {
        console.log('error with post url', error);
    } 
}

function* fetchUrl(action) {
    try {
        const fileResponse = yield axios.get(`/api/file/${action.payload.job_id}`);
        console.log('file array', fileResponse);
        yield put({type: 'SET_URL', payload: fileResponse.data});
    } catch(error) {
        console.log('error with fetch url', error);
    }
}

//watcher saga
function* urlSaga() {
    //take every action with type = SET_ELEMENT dispatched
    yield takeEvery('ADD_URL', postUrl)
    yield takeEvery('FETCH_URL', fetchUrl)
}

export default urlSaga;