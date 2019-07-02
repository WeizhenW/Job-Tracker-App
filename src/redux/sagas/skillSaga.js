import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job skills
function* fetchAllSkills() {
    const allSkillsResponse = yield axios.get('/api/skill');
    yield put({
        type: 'SET_ALL_SKILLS',
        payload: allSkillsResponse.data,
    })
}

//generator to get skills for one job
function* fetchSkillsForOneJob(action) {
    const skillsForOneJobResponse = yield axios.get(`/api/skill/${action.payload.id}`);
    yield put({
        type: 'SET_ALL_SKILLS',
        payload: skillsForOneJobResponse.data,
    })
}

function* jobSkillSaga() {
    yield takeEvery('FETCH_ALL_SKILLS', fetchAllSkills);
    yield takeEvery('FETCH_ONE_JOB_SKILLS', fetchSkillsForOneJob);

  }
  
  export default jobSkillSaga;