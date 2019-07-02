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
        type: 'SET_SKILLS_FOR_ONE_JOB',
        payload: skillsForOneJobResponse.data,
    })
}

//generator to add one skill into one job
function* addSkillToJob(action) {
    yield axios.post(`/api/skill/add`, action.payload);
    yield put({
        type: 'FETCH_ONE_JOB_SKILLS',
        payload: {id: action.payload.job_id}
    })
}

//generator to remove one skill into one job
function* removeSkillOneJob(action) {
    yield axios.delete(`/api/skill/delete/${action.payload.job_id}/${action.payload.skill_id}`);
    yield put({
        type: 'FETCH_ONE_JOB_SKILLS',
        payload: {id: action.payload.job_id}
    })
}

function* jobSkillSaga() {
    yield takeEvery('FETCH_ALL_SKILLS', fetchAllSkills);
    yield takeEvery('FETCH_ONE_JOB_SKILLS', fetchSkillsForOneJob);
    yield takeEvery('ADD_ONE_SKILL', addSkillToJob);
    yield takeEvery('REMOVE_SKILL', removeSkillOneJob);

  }
  
  export default jobSkillSaga;