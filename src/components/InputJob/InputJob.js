import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './InputJob.css';

//material ui
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
//sweet alert
import Swal from 'sweetalert2'

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto',
        width: '80%',
    },
    dropdown: {
        marginTop: 10,
    },
    title: {
        textAlign: 'center',
        color: '#333333',
        fontSize: '24px',
        width: '80%',
        margin: '0 auto',
    },
    button: {
        marginTop: '30px',
        marginLeft: '200px',
    },
};

class InputJob extends Component {
    //in component did mount => fetch all status to populate the ddl
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        })
    };
    //local state to temporarily hold the inputs
    state = {
        companyName: '',
        jobTitle: '',
        postUrl: '',
        status_id: '',
    }
    //capture input
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }
    //on click => dispatch action to post
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.companyName && this.state.jobTitle && this.state.postUrl && this.state.status_id) {
            this.props.dispatch({
                type: 'POST_NEW_JOB',
                payload: {
                    history: this.props.history,
                    job: this.state,
                }
            });
            this.setState({
                companyName: '',
                jobTitle: '',
                postUrl: '',
                status_id: '',
            });
            Swal.fire({
                text: 'Job added to the list',
                type: 'success'
            })
        } else {
            Swal.fire({
                text: 'All fields are mandatory',
                type: 'error'
            })
        }
    }

    //fill content for demo purpose
    handleFillContent = () => {
        this.setState({
            companyName: 'UnitedHealth Group',
            jobTitle: 'Associate Software Designer - Telecommute – USA',
            postUrl: 'https://www.linkedin.com/jobs/view/1365017608/',
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid  item xs={12} sm={8}>
                        <div style={styles.title}>
                            <h2 >Enter a New Job </h2>
                        </div>
                        <div style={styles.container}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <h2 onClick={this.handleFillContent}>Core info:</h2>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="company-name"
                                        label="Company Name *"
                                        value={this.state.companyName}
                                        onChange={this.handleChangeFor('companyName')}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="job-title"
                                        label="Job Title *"
                                        variant="outlined"
                                        value={this.state.jobTitle}
                                        onChange={this.handleChangeFor('jobTitle')}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                id="post-url"
                                label="Post URL *"
                                variant="outlined"
                                value={this.state.postUrl}
                                onChange={this.handleChangeFor('postUrl')}
                                margin="normal"
                                fullWidth
                            />
                            <br />
                            <h2>Have you applied for the job?</h2>
                            <FormControl style={styles.dropdown} fullWidth variant="outlined">
                                <InputLabel htmlFor="status">
                                    Job Status
                                </InputLabel>
                                <Select
                                    onChange={this.handleChangeFor('status_id')}
                                    input={<OutlinedInput name="status" id="status" />}
                                    value={this.state.status_id}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.props.reduxState.status.map(status => <MenuItem key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <div>
                                <Link to='/home'><Button style={styles.button} variant="contained" color="secondary" >Cancel</Button></Link>
                                <Button style={styles.button} variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                            </div>
                        </div>
                        <pre>
                            {/* {JSON.stringify(this.props.reduxState.status, null, 2)} */}
                            {/* {JSON.stringify(this.state, null, 2)} */}
                        </pre>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(InputJob);
