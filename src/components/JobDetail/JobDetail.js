import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FileDisplay from '../FileDisplay/FileDisplay';
import './JobDetail.css';

//material ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const styles = {
    title: {
        textAlign: 'center',
        fontSize: '20px',
        marginTop: '20px',
    },
    jobTitle: {
        fontWeight: 600,
    },
    button: {
        margin: 20,
        float: 'right',
    },
    buttonBack: {
        margin: 20,
        float: 'left',
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
        this.props.dispatch({
            type: 'GET_CONTACT_FOR_ONE_JOB',
            payload: { job_id: this.props.match.params.id }
        })
    }

    handleGoToEdit = (id) => {
        this.props.history.push(`/job-list/edit/${id}`);

    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div style={styles.title}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <Link to="/job-list"><Button style={styles.buttonBack} variant="contained">Back to List</Button></Link>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h2>{this.props.jobDetail.title}</h2>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Link to={`/job-list/edit/${this.props.match.params.id}`}><Button style={styles.button} variant="contained">Edit</Button></Link>
                                </Grid>
                            </Grid>
                        </div>
                        <div className='company'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Company Name: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {this.props.jobDetail.company}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Company Address: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {this.props.jobDetail.address}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Company Website: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {this.props.jobDetail.website}
                                </Grid>
                            </Grid>
                        </div>
                        <div className='jobDetail'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Post URL: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <a href={this.props.jobDetail.post_url} target="_blank">Click</a>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Job Status: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {this.props.jobDetail.status_name}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Follow Up: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {this.props.jobDetail.follow_up ?
                                        'YES'
                                        :
                                        'NO'}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Contact Email: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {this.props.jobDetail.email}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <span style={styles.jobTitle}>Contact Phone: </span>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {this.props.jobDetail.phone}
                                </Grid>
                            </Grid>
                            <br />

                            <Grid item xs={12} sm={12}>
                                <span style={styles.jobTitle}>Comment: </span> <br /> {this.props.jobDetail.note}
                            </Grid>
                            <br />
                            <Grid item xs={12} sm={12}>
                                <span style={styles.jobTitle}>Job Skills Required: </span>
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
                        </div>
                        <div className='reference'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <h4>Reference</h4>

                                    {/* {JSON.stringify(this.props.reduxState.contact, null, 2)} */}
                                    <p>First Name: {this.props.reduxState.contact.contactOneJobReducer[0] && this.props.reduxState.contact.contactOneJobReducer[0].first_name}</p>
                                    <p>Last Name: {this.props.reduxState.contact.contactOneJobReducer[0] && this.props.reduxState.contact.contactOneJobReducer[0].last_name} </p>

                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FileDisplay job_id={this.props.match.params.id} />
                                </Grid>
                            </Grid>
                        </div>

                        {/* <Button style={styles.button} variant="contained" onClick={() => this.handleGoToEdit(this.props.match.params.id)}>Edit</Button> */}
                        {/* <Link to="/job-list"><Button style={styles.button} variant="contained">Back to List</Button></Link> */}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
    jobDetail: reduxState.jobList.jobDetailReducer,
    skills: reduxState.skill,
})
export default connect(mapReduxStateToProps)(JobDetail);