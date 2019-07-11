import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        width: '80%',
    },
    dropdown: {
        marginTop: 10,
    },

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

class ContactEntry extends Component {
    //local state to temporarily hold the inputs
    state = {
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        phone: '',
        email: '',
        note: '',
        role: '',
        job_id: this.props.job_id,
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

        console.log('in handle click');
        this.props.dispatch({
            type: 'ADD_CONTACT',
            payload: this.state,
        })
        this.setState({
            firstName: '',
            lastName: '',
            company: '',
            title: '',
            phone: '',
            email: '',
            note: '',
            role: '',
        })
    }

    render() {
        return (
                <div style={styles.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="first-name"
                                label="First Name"
                                onChange={this.handleChangeFor('firstName')}
                                value={this.state.firstName}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="last-name"
                                label="Last Name"
                                onChange={this.handleChangeFor('lastName')}
                                value={this.state.lastName}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                     
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="company-name"
                                label="Company Name"
                                onChange={this.handleChangeFor('company')}
                                value={this.state.company}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="title"
                                label="Job Title"
                                onChange={this.handleChangeFor('title')}
                                value={this.state.title}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="phone"
                                label="Phone"
                                onChange={this.handleChangeFor('phone')}
                                value={this.state.phone}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="email"
                                label="Email"
                                onChange={this.handleChangeFor('email')}
                                value={this.state.email}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                multiline
                                id="note"
                                label="Note"
                                variant="outlined"
                                onChange={this.handleChangeFor('note')}
                                value={this.state.note}
                                fullWidth
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12} sm={6}>
                            <FormControl style={styles.dropdown} fullWidth variant="outlined">
                                <InputLabel htmlFor="role">
                                    Role
                                </InputLabel>
                                <Select
                                    onChange={this.handleChangeFor('role')}
                                    input={<OutlinedInput name="role" id="role" />}
                                    value={this.state.role}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Recruiter">
                                        <em>Recruiter</em>
                                    </MenuItem>
                                    <MenuItem value="Hiring Manager">
                                        <em>Hiring Manager</em>
                                    </MenuItem>
                                    <MenuItem value="Other Contact">
                                        <em>Other Contact</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button style={styles.button} variant="contained" color="primary" type="submit" onClick={this.handleSubmit}>CREATE</Button>
                        </Grid>
                    </Grid>
                </div>

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(ContactEntry);
