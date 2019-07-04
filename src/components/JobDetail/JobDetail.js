import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//material ui

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const styles = {

    paper: {
        width: '80%',
        margin: '10px auto',
        padding: '100px 50px',
        paddingTop: '50px',
    },
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '28px'
    },
    detail: {
        marginTop: 60,
        fontSize: 18,
    },
    jobTitle: {
        color: '#2f5bf7',
        fontWeight: 600,
    },
    button: {
        margin: 20,
        float: 'right',
    },
    skills: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 5,
    }
};

class JobDetail extends Component {
    //at page load, fetch the details from db for one job
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ONE_JOB_DETAIL',
            payload: { id: this.props.match.params.id },
        });
        this.props.dispatch({
            type: 'FETCH_ONE_JOB_SKILLS',
            payload: { id: this.props.match.params.id },
        });
    }

    handleGoToEdit = (id) => {
        this.props.history.push(`/job-list/edit/${id}`);

    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        this is the side
                        <br />
                        i don't know what to put
                        <br />
                        i am stuck with styling
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper style={styles.paper}>
                            <div style={styles.title}>
                                <h2>Job Detail Page</h2>
                            </div>
                            {/* <pre>
                                {JSON.stringify(this.props.jobDetail, null, 2)}
                            </pre> */}
                            <div style={styles.detail}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <span style={styles.jobTitle}>Job Title: </span> {this.props.jobDetail.title}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <span style={styles.jobTitle}>Post URL: </span>{this.props.jobDetail.post_url}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <span style={styles.jobTitle}>Job Status: </span> {this.props.jobDetail.status_name}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <span style={styles.jobTitle}>Job Status: </span> 
                                        {this.props.jobDetail.follow_up?
                                        'YES'
                                        :
                                        'NO'}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <span style={styles.jobTitle}>Company Name: </span>{this.props.jobDetail.company}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>

                                        <span style={styles.jobTitle}>Company Address: </span>{this.props.jobDetail.address}
                                    </Grid>
                                    <Grid item xs={12} sm={4}>

                                        <span style={styles.jobTitle}>Website: </span>{this.props.jobDetail.website}
                                        </Grid>

                                        <Grid item xs={12} sm={4}>

                                            <span style={styles.jobTitle}>Email: </span>{this.props.jobDetail.email}
                                        </Grid>
                                        <Grid item xs={12} sm={4}>

                                            <span style={styles.jobTitle}>Phone: </span>{this.props.jobDetail.phone}
                                        </Grid>
                                    </Grid>
                                    <br />

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <span style={styles.jobTitle}>Comment: </span>{this.props.jobDetail.note}
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <span style={styles.jobTitle}>Job Skills: </span>
                                            <br />
                                            <br />
                                            <div >
                                                {this.props.skills.skillsForOneJobReducer && this.props.skills.skillsForOneJobReducer[0] ?
                                                    this.props.skills.skillsForOneJobReducer.map(skill => <Chip style={styles.chip} key={skill.skill_id} label={skill.skill} color="primary" />)
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                            </div>

                                <Button style={styles.button} variant="contained" onClick={() => this.handleGoToEdit(this.props.match.params.id)}>Edit</Button>
                                <Link to="/job-list"><Button style={styles.button} variant="contained">Back to List</Button></Link>
                                <Link to="/new-job"><Button style={styles.button} variant="contained">Add Job</Button></Link>
                        </Paper>
                    </Grid>
                    </Grid>
            </div>
                )
            }
        }

const mapReduxStateToProps = reduxState => ({
                    reduxState,
                jobDetail: reduxState.jobList.jobDetailReducer,
                skills: reduxState.skill,
            })
export default connect(mapReduxStateToProps)(JobDetail);