import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const styles = {

    skills: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: '20px 5px',
    },
    addButton: {
        margin: 20,
        float: 'right',
    }


};


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
            payload: { id: this.props.job_id },
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
                    {/* {JSON.stringify(this.state)} */}
                </pre>
                <InputLabel htmlFor="skill">Job Skills Required</InputLabel>
                <Select 
                    value={this.state.skill_id} 
                    type="text" 
                    name="skill" 
                    displayEmpty 
                    fullWidth 
                    onChange={this.handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.props.skills.allSkillsReducer.map(skill => <MenuItem key={skill.id} value={skill.id}>{skill.skill}</MenuItem>)}
                </Select>
                <Button style={styles.addButton} variant="contained" onClick={this.handleAdd}>Add</Button>
                <br />
                <br />
                {this.props.skills.skillsForOneJobReducer && this.props.skills.skillsForOneJobReducer[0] ?
                    this.props.skills.skillsForOneJobReducer.map(skill => <Chip style={styles.chip} onDelete={() => this.handleRemove(skill)} key={skill.skill_id} label={skill.skill} color="primary" />)
                    :
                    ''
                }

            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
    skills: reduxState.skill,
})
export default connect(mapReduxStateToProps)(SkillsPerJob);