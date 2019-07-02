import React, { Component } from 'react';
import { connect } from 'react-redux';

class SkillsPerJob extends Component {

    //at page load, fetch the list of job skills from db
    componentDidMount() {
        //fetch full list of job skills
        this.props.dispatch({
            type: 'FETCH_ALL_SKILLS',
        });
    }



    //get input and save to local state
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            job: {
                ...this.state.job,
                [propertyName]: event.target.value,
            }
        })
    }

    //function to dispatch action to add one skill
    handleAdd = () => {
        console.log('in add skill');
    }

    render() {
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.job)}
                </pre>

                <select type="text" name="skill" onChange={this.handleChangeFor('skill_id')}>
                    {this.props.reduxState.skill.map(skill => <option key={skill.id} value={skill.id}>{skill.skill}</option>)}
                </select>
                <button onClick={this.handleAdd}>Add</button>
                <li>Skills:
                        {this.props.job.skills && this.props.job.skills[0] ?
                        <ul>{this.props.job.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
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
})
export default connect(mapReduxStateToProps)(SkillsPerJob);