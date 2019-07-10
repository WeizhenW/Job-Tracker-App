import React, { Component } from 'react';
import { connect } from 'react-redux';
import Skills from '../SkillsPerJob/SkillsPerJob';
import './EditDetail.css';
import FileUpload from '../FileUpload/FileUpload';
import FileDisplay from '../FileDisplay/FileDisplay';
import ContactEntry from '../ContactEntry/ContactEntry';
import ContactCreation from '../ContactCreation/ContactCreation';

//material ui
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        width: '80%',

    },
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '20px'
    },
    button: {
        display: 'inline- flex',
        // float: 'right',
        marginTop: '20px',
        marginLeft: '200px',
    },
};

class EditDetail extends Component {
    //local state
    state = {
        job: this.props.jobDetail,
        contactSelection: true,
    }

    //at page load, fetch the details from db
    componentDidMount() {
        //fetch details for one job
        this.props.dispatch({
            type: 'FETCH_ONE_JOB_DETAIL',
            payload: { id: this.props.match.params.id },
        });
        //fetch full list of status
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        });
    }

    //get input and save to local state
    handleChangeFor = (propertyName) => (event) => {
        if (propertyName === 'follow_up') {
            this.setState({
                job: {
                    ...this.state.job,
                    follow_up: event.target.checked,
                }
            })
        } else {
            this.setState({
                job: {
                    ...this.state.job,
                    [propertyName]: event.target.value,
                }
            })
        }
    }

    //dispatch to save new input to database
    handleSave = (id) => {
        this.props.dispatch({
            type: 'UPDATE_JOB_DETAIL',
            payload: {
                ...this.state.job,
                job_id: this.props.match.params.id,
            }
        })
        this.props.history.push(`/job-list/detail/${id}`);
    }

    //function to go back to the detail page
    handleCancel = (id) => {
        this.props.history.push(`/job-list/detail/${id}`);
    }

    render() {
        return (
                <div>
                    <pre>
                        {/* {JSON.stringify(this.state, null, 2)} */}
                        {/* {JSON.stringify(this.props.status, null, 2)} */}
                    </pre>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div style={styles.title}>
                                <h2>Edit the Job Detail</h2>
                            </div>
                            <div>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="job-title"
                                            label="Job Title"
                                            onChange={this.handleChangeFor('title')}
                                            value={this.state.job.title}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="post-url"
                                            label="Post URL"
                                            onChange={this.handleChangeFor('post_url')}
                                            value={this.state.job.post_url}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <span style={styles.jobTitle}>Job Status: </span> {this.props.jobDetail.status_name}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Switch checked={this.state.job.follow_up} onChange={this.handleChangeFor('follow_up')} value="follow_up" />
                                                }
                                                label="Follow Up"
                                            />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            id="company-name"
                                            label="Company Name"
                                            onChange={this.handleChangeFor('company')}
                                            value={this.state.job.company}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            id="address"
                                            label="Company Address"
                                            onChange={this.handleChangeFor('address')}
                                            value={this.state.job.address}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="website"
                                            label="Company Website"
                                            onChange={this.handleChangeFor('website')}
                                            value={this.state.job.website}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            onChange={this.handleChangeFor('email')}
                                            value={this.state.job.email}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="phone"
                                            label="Phone Number"
                                            onChange={this.handleChangeFor('phone')}
                                            value={this.state.job.phone}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            multiline
                                            id="note"
                                            label="Notes"
                                            onChange={this.handleChangeFor('note')}
                                            value={this.state.job.note}
                                            margin="normal"
                                            fullWidth
                                            style={styles.TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Skills job_id={this.props.match.params.id} />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FileUpload job_id={this.props.match.params.id} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FileDisplay job_id={this.props.match.params.id} />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <h4>My Reference</h4>
                                        <Button onClick={() => { this.setState({ contactSelection: !this.state.contactSelection }) }}>Toggle</Button>
                                        {this.state.contactSelection ?
                                            <ContactEntry job_id={this.props.match.params.id} />
                                            :
                                            <ContactCreation job_id={this.props.match.params.id} />
                                        }
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Button style={styles.button} variant="contained" onClick={() => this.handleCancel(this.props.match.params.id)}>Cancel</Button>
                                        <Button style={styles.button} variant="contained" onClick={() => this.handleSave(this.props.match.params.id)}>Save</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        </Grid>
                    </Grid>
                </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    jobDetail: reduxState.jobList.jobDetailReducer,
    status: reduxState.status,
})
export default connect(mapReduxStateToProps)(EditDetail);    