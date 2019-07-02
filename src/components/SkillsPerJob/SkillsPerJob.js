import React, { Component } from 'react';
import { connect } from 'react-redux';

class SkillsPerJob extends Component {

    //at page load, fetch the list of job skills from db
    componentDidMount() {
        //fetch full list of job skills
        this.props.dispatch({
            type: 'FETCH_ALL_SKILLS',
        });
        //fetch job skills tagged for this job
        this.props.dispatch({
            type: 'FETCH_ONE_JOB_SKILLS',
            payload: {id: this.props.job_id},
        });
    }

    //local state to hold the skills chose
    state = {
        skill_id: '',
    }


    //get input and save to local state
    handleChange = (event) => {
        this.setState({
            skill_id: event.target.value,     
        })
    }

    //function to dispatch action to add one skill
    handleAdd = () => {
        this.props.dispatch({
            type: 'ADD_ONE_SKILL',
            payload: {
                job_id: this.props.job_id,
                skill_id: this.state.skill_id,
            }
        })
    }

    //function to dispatch action to remove one skill from one job
    handleRemove = (skillToRemove) => {
        console.log('inside handle move', skillToRemove.skill_id, skillToRemove.job_id);
        this.props.dispatch({
            type: 'REMOVE_SKILL',
            payload: {
                skill_id: skillToRemove.skill_id,
                job_id: skillToRemove.job_id,
            }
        })
    }
    render() {
        return (
            <div>
                <pre>
                    {/* {JSON.stringify(this.props.skills.skillsForOneJobReducer, null, 2)} */}
                    {JSON.stringify(this.state)}
                </pre>

                <select type="text" name="skill" onChange={this.handleChange}>
                    {this.props.skills.allSkillsReducer.map(skill => <option key={skill.id} value={skill.id}>{skill.skill}</option>)}
                </select>
                <button onClick={this.handleAdd}>Add</button>
                <li>Skills:
                        {this.props.skills.skillsForOneJobReducer && this.props.skills.skillsForOneJobReducer[0] ?
                        <ul>{this.props.skills.skillsForOneJobReducer.map(skill => <li onClick={() => this.handleRemove(skill)} key={skill.skill_id}>{skill.skill}</li>)}</ul>
                        :
                        'null'
                    }
                </li>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
    skills: reduxState.skill,
})
export default connect(mapReduxStateToProps)(SkillsPerJob);