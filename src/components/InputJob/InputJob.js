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
import { Input } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        width: '60%',
    },
    dropdown: {
        marginTop: 10,
    },
    // paper: {
    //     width: '80%',
    //     margin: '10px auto',
    //     padding: '100px 50px',
    //     paddingTop: '50px'
    // },
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '22px',
        marginTop: '80px',
    },
    button: {
        // display: 'inline-flex',
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
        event.preventDefault()

        if (this.state.companyName && this.state.jobTitle && this.state.postUrl && this.state.status_id) {
            this.props.dispatch({
                type: 'POST_NEW_JOB',
                payload: {
                    history: this.props.history,
                    job: this.state,
                }
            })
        } else {
            alert('input field cannot be empty');
            return;
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        {/* <Paper style={styles.paper}> */}
                        <div style={styles.title}>
                            <h2 >Enter a New Job: </h2>
                        </div>
                        <form style={styles.container} onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <h4>Basic info:</h4>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="company-name"
                                        label="Company Name *"
                                        onChange={this.handleChangeFor('companyName')}
                                        // margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        // style={styles.TextField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="job-title"
                                        label="Job Title *"
                                        variant="outlined"
                                        onChange={this.handleChangeFor('jobTitle')}
                                        // margin="normal"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                id="post-url"
                                label="Post URL *"
                                variant="outlined"
                                onChange={this.handleChangeFor('postUrl')}
                                margin="normal"
                                fullWidth
                            />
                            <br />
                            <h4>Have you applied for the job?</h4>
                            <FormControl style={styles.dropdown} fullWidth variant="outlined">
                                <InputLabel htmlFor="status">
                                    Job Status
                                </InputLabel>
                                <Select
                                    onChange={this.handleChangeFor('status_id')}
                                    input={<OutlinedInput name="status" id="status" />}
                                    // displayEmpty
                                    value={this.state.status_id}
                                // name="status"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.props.reduxState.status.map(status => <MenuItem key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <div>
                                <Link to='/home'><Button style={styles.button} variant="contained" color="secondary" >Cancel</Button></Link>
                                <Button style={styles.button} variant="contained" color="primary" type="submit">Submit</Button>
                            </div>
                        </form>
                        <pre>
                            {/* {JSON.stringify(this.props.reduxState.status, null, 2)} */}
                            {/* {JSON.stringify(this.state, null, 2)} */}
                        </pre>
                        {/* </Paper> */}
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
