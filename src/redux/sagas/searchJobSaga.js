import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job status
function* searchByCompany(action) {
    const searchByCompanyResponse = yield axios.get(`/api/search?company=${action.payload.companyName}`);
    yield put({type: 'SET_SEARCH_BY_COMPANY_RESULTS', payload: searchByCompanyResponse});
}



function* searchJobSaga() {
    yield takeLatest('SEARCH_JOB_BY_COMPANY', searchByCompany);
  }
  
  export default searchJobSaga;