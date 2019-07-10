import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//generator to get all job skills
function* fetchAllSkills() {
    try {
        const allSkillsResponse = yield axios.get('/api/skill');
        yield put({
            type: 'SET_ALL_SKILLS',
            payload: allSkillsResponse.data,
        })
    } catch(error) {
        console.log('error with fetch all skills', error);
    }  
}

//generator to get skills for one job
function* fetchSkillsForOneJob(action) {
    try {
        const skillsForOneJobResponse = yield axios.get(`/api/skill/${action.payload.id}`);
        yield put({
            type: 'SET_SKILLS_FOR_ONE_JOB',
            payload: skillsForOneJobResponse.data,
        })
    } catch(error) {
        console.log('error with fetch skills for one job', error);
    }
}

//generator to add one skill into one job
function* addSkillToJob(action) {
    try {
        yield axios.post(`/api/skill/add`, action.payload);
        yield put({
            type: 'FETCH_ONE_JOB_SKILLS',
            payload: {id: action.payload.job_id}
        })
    } catch(error) {
        console.log('error with add skill to job', error);
    }
}

//generator to remove one skill into one job
function* removeSkillOneJob(action) {
    try {
        yield axios.delete(`/api/skill/delete/${action.payload.job_id}/${action.payload.skill_id}`);
        yield put({
            type: 'FETCH_ONE_JOB_SKILLS',
            payload: {id: action.payload.job_id}
        })
    } catch(error) {
        console.log('error with remove skill one job', error);
    }
}

//generator to get top skills
function* getTopSkills() {
    try {
        const topSkillsResponse = yield axios.get('/api/chart/skills')
        yield put({
            type: 'SET_TOP_SKILLS',
            payload: topSkillsResponse.data,
        })
    } catch(error) {
        console.log('error with get top skills', error);
    }
}

function* jobSkillSaga() {
    yield takeEvery('FETCH_ALL_SKILLS', fetchAllSkills);
    yield takeEvery('FETCH_ONE_JOB_SKILLS', fetchSkillsForOneJob);
    yield takeEvery('ADD_ONE_SKILL', addSkillToJob);
    yield takeEvery('REMOVE_SKILL', removeSkillOneJob);
    yield takeEvery('FETCH_TOP_JOB_SKILLS', getTopSkills);

  }
  
export default jobSkillSaga;