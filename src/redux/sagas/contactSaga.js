import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* postContact(action) {
    try {
        const postContactResponse = yield axios.post('/api/contact', action.payload);
        if(action.payload.job_id) {
            yield put({
                type: 'ADD_CONTACT_TO_JOB', 
                payload: {job_id: action.payload.job_id, contact_id:postContactResponse.data.id}})
        } else {
            yield put({type: 'FETCH_CONTACT'});
        }
    } catch(error) {
        console.log('error with post contact', error);
    }
}

function* fetchContact() {
    try {
        const contactResponse = yield axios.get(`/api/contact`);
        console.log(contactResponse.data);
        yield put({type: 'SET_CONTACT', payload: contactResponse.data});
    } catch(error) {
        console.log('error with fetch contact', error);
    }
    
}

function* addContactToJob(action) {
    try {
        yield axios.post(`/api/contact/${action.payload.job_id}`, action.payload);
    } catch(error) {
        console.log('error with add contact to job', error);
    }
}

function* getContactForOneJob(action) {
    try {
        const responseContactOneJob = yield axios.get(`/api/contact/${action.payload.job_id}`);
        yield put({type: 'SET_CONTACT_FOR_ONE_JOB', payload: responseContactOneJob.data});
    } catch(error) {
        console.log('error with get contact for one job', error);
    }
    
}

//watcher saga
function* contactSaga() {
    yield takeEvery('ADD_CONTACT', postContact)
    yield takeEvery('FETCH_CONTACT', fetchContact)
    yield takeEvery('ADD_CONTACT_TO_JOB', addContactToJob)
    yield takeEvery('GET_CONTACT_FOR_ONE_JOB', getContactForOneJob)
}

export default contactSaga;