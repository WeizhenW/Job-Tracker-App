import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* searchByCompany(action) {
    try {
        const searchByCompanyResponse = yield axios.get(`/api/search/company?company=${action.payload.companyName}`);
        yield put({type: 'SET_SEARCH_RESULTS', payload: searchByCompanyResponse});
    } catch(error) {
        console.log('error with search by company', error);
    } 
}

//generator to get all job status
function* searchByStatus(action) {
    try {
        const searchByStatusResponse = yield axios.get(`/api/search/status?status_id=${action.payload.status_id}`);
        yield put({type: 'SET_SEARCH_RESULTS', payload: searchByStatusResponse});
    } catch(error) {
        console.log('error with search by status', error);
    }
}



function* searchJobSaga() {
    yield takeLatest('SEARCH_JOB_BY_COMPANY', searchByCompany);
    yield takeLatest('SEARCH_JOB_BY_STATUS', searchByStatus);
  }
  
export default searchJobSaga;