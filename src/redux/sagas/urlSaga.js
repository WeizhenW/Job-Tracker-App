import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* postUrl(action) {
    yield axios.post('/api/file', action.payload);
    yield put({type: 'FETCH_URL', payload: action.payload});
}

function* fetchUrl(action) {
    const fileResponse = yield axios.get(`/api/file/${action.payload.job_id}`);
    console.log('file array', fileResponse);
    yield put({type: 'SET_URL', payload: fileResponse.data});
}

//watcher saga
function* urlSaga() {
    //take every action with type = SET_ELEMENT dispatched
    yield takeEvery('ADD_URL', postUrl)
    yield takeEvery('FETCH_URL', fetchUrl)
}

export default urlSaga;