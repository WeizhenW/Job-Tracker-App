import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* postContact(action) {
    const postContactResponse = yield axios.post('/api/contact', action.payload);
    console.log(postContactResponse);
    if(action.payload.job_id) {
        yield put({
            type: 'ADD_CONTACT_TO_JOB', 
            payload: {job_id: action.payload.job_id, contact_id:postContactResponse.data.id}})
    } else {
        yield put({type: 'FETCH_CONTACT'});
    }
}

function* fetchContact() {
    const contactResponse = yield axios.get(`/api/contact`);
    console.log(contactResponse.data);
    yield put({type: 'SET_CONTACT', payload: contactResponse.data});
}

function* addContactToJob(action) {
    yield axios.post(`/api/contact/${action.payload.job_id}`, action.payload);
    // yield put({type: 'FETCH_CONTACT'});
}

function* getContactForOneJob(action) {
    const responseContactOneJob = yield axios.get(`/api/contact/${action.payload.job_id}`);
    yield put({type: 'SET_CONTACT_FOR_ONE_JOB', payload: responseContactOneJob.data});
}

//watcher saga
function* contactSaga() {
    //take every action with type = SET_ELEMENT dispatched
    yield takeEvery('ADD_CONTACT', postContact)
    yield takeEvery('FETCH_CONTACT', fetchContact)
    yield takeEvery('ADD_CONTACT_TO_JOB', addContactToJob)
    yield takeEvery('GET_CONTACT_FOR_ONE_JOB', getContactForOneJob)
}

export default contactSaga;