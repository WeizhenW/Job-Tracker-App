import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        width: '80%',

    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 300,
    },
    paper: {
        width: '80%',
        margin: '10px auto',
        padding: '100px',
    },
    title: {
        textAlign: 'center',
        color: '#F7882F',
    },
    buttonDiv: {
        // marginTop: '50px',
    },
    button: {
        display: 'inline-flex',
        alignItems: 'right',
        marginTop: '20px',
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
    handleSubmit = () => {
        if (this.state.companyName && this.state.jobTitle && this.state.postUrl && this.state.status_id) {
            this.props.dispatch({
                type: 'POST_NEW_JOB',
                payload: this.state,
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
                    <Grid item xs={12} sm={3}>
                        this is the side
                        <br />
                        i don't know what to put
                        <br/>
                        i am stuck with styling
                        </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper style={styles.paper}>
                            <div style={styles.title}>
                                <h2 >Enter a New Job: </h2>
                            </div>
                            <form style={styles.container} onSubmit={this.handleSubmit}>
                                <TextField
                                    id="company-name"
                                    label="Company Name"
                                    onChange={this.handleChangeFor('companyName')}
                                    margin="normal"
                                    fullWidth
                                    style={styles.TextField}
                                />
                                <TextField
                                    id="job-title"
                                    label="Job Title"
                                    onChange={this.handleChangeFor('jobTitle')}
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    id="post-url"
                                    label="Post URL"
                                    onChange={this.handleChangeFor('postUrl')}
                                    margin="normal"
                                    fullWidth
                                />
                                
                                <FormControl fullWidth>
                                    <br />
                                    <InputLabel htmlFor="status">
                                        Job Status
                                    </InputLabel>
                                    <Select
                                        onChange={this.handleChangeFor('status_id')}
                                        input={<Input name="age" id="staus" />}
                                        displayEmpty
                                        value={this.state.status_id}
                                        fullWidth
                                        name="status"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.props.reduxState.status.map(status => <MenuItem key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <div style={styles.buttonDiv} >
                                <Link><Button style={styles.button} variant="contained" color="secondary" to='/home'>Cancel</Button></Link>
                                <Button style={styles.button} variant="contained" color="primary" type="submit">Submit</Button>
                                </div>
                            </form>
                            <pre>
                                {/* {JSON.stringify(this.props.reduxState.status, null, 2)} */}
                                {/* {JSON.stringify(this.state, null, 2)} */}
                            </pre>
                        </Paper>
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
