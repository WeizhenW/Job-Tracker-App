import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* postContact(action) {
    console.log('in saga');
    yield axios.post('/api/contact', action.payload);
    yield put({type: 'FETCH_CONTACT'});
}

function* fetchContact() {
    const contactResponse = yield axios.get(`/api/contact`);
    console.log(contactResponse.data);
    yield put({type: 'SET_CONTACT', payload: contactResponse.data});
}

//watcher saga
function* contactSaga() {
    //take every action with type = SET_ELEMENT dispatched
    yield takeEvery('ADD_CONTACT', postContact)
    yield takeEvery('FETCH_CONTACT', fetchContact)
}

export default contactSaga;