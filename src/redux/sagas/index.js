import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import jobStatusSaga from './jobStatusSaga';
import newJobSaga from './newJobSaga';
import jobListSaga from './jobListSaga';
import skillSaga from './skillSaga';
import followUpSaga from './followUpSaga';
import urlSaga from './urlSaga';
import searchJobSaga from './searchJobSaga';
import contact from './contactSaga';
import contactSaga from './contactSaga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    jobStatusSaga(),
    newJobSaga(),
    jobListSaga(),
    skillSaga(),
    followUpSaga(),
    urlSaga(),
    searchJobSaga(),
    contactSaga(),
  ]);
}
