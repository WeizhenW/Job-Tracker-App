import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './FollowUp.css';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Done from '@material-ui/icons/Done';


const styles = {
    tableHeader: {
        fontSize: '16px',
        backgroundColor: 'black',
        color: 'white',
    },
    table: {
        marginTop: '50px',
    },
    tableBody: {
        fontSize: '16px',
    },
    jobTitle: {
        textDecoration: 'underline',
    },
    button: {
        fontSize: '14px',
    },
    specialFont: {
        fontSize: '14px',
    },
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '24px',
    },
    checked: {
        fontSize: '28px',
        color: 'green',
    },
    paper: {
        width: '80%',
        margin: '10px auto',
        padding: '20px 100px',
    },
}

class FollowUp extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FOLLOW_UP_LIST' });
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        });
    }
    
    //get input and dispatch the update action immediately
    handleChange = (job) => (event) => {
        this.props.dispatch({
            type: 'UPDATE_JOB_STATUS',
            payload: {
                status_id: event.target.value,
                job_id: job.id,
            },
        })
    }

    //function to update status date
    handleFollowUp = (job) => {
        this.props.dispatch({
            type: 'UPDATE_STATUS_DATE',
            payload: {
                job_id: job.id,
            }
        })
    }

    //function to update follow up mode
    handleChangeFollowUp = (job) => (event) => {
        this.props.dispatch({
            type: 'UPDATE_FOLLOW_UP_MODE',
            payload: {
                job_id: job.id,
                follow_up: event.target.checked,
            }
        })
    }

    //function to get job details for one job
    handleGetDetail = (job) => {
        this.props.history.push(`/job-list/detail/${job.id}`);
    }

    render() {
        return (
            <div>
                    {this.props.reduxState.followup.followUpReducer.length ?
                        <>
                            <div style={styles.title}>
                                <h2>My Follow Up Task List</h2>
                            </div>
                            <pre>
                                {/* {JSON.stringify(this.props.reduxState.jobList.appliedJobsListReducer, null, 2)} */}
                            </pre>
                            <Table style={styles.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={styles.tableHeader}>Job Title</TableCell>
                                        <TableCell style={styles.tableHeader}>Company</TableCell>
                                        <TableCell style={styles.tableHeader}>Status</TableCell>
                                        <TableCell style={styles.tableHeader}>Action</TableCell>
                                        <TableCell style={styles.tableHeader}>Follow Up</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.reduxState.followup.followUpReducer.map(job => <TableRow key={job.id}>
                                        <TableCell style={styles.jobTitle}><Link to={`/job-list/detail/${job.id}`} >{job.title}</Link></TableCell>
                                        <TableCell style={styles.tableBody}>{job.company}</TableCell>
                                        <TableCell style={styles.tableBody}>
                                            <Select                                    
                                                input={<OutlinedInput name="status" id="status" />}
                                                value={job.status_id}
                                                onChange={this.handleChange(job)}
                                                style={styles.specialFont}
                                            >
                                                {this.props.status.map(status => <MenuItem style={styles.specialFont} key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                            </Select>
                                        </TableCell>
                                        <TableCell style={styles.tableBody}>
                                            <Done onClick={() => this.handleFollowUp(job)} style={styles.checked}/>
                                        </TableCell>
                                        <TableCell style={styles.tableBody}>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    style={styles.specialFont}
                                                    control={
                                                        <Switch checked={job.follow_up} onChange={this.handleChangeFollowUp(job)} value="follow_up" />
                                                    }
                                                    label="on"
                                                />
                                            </FormGroup>
                                        </TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </>
                        :
                        <Paper style={styles.paper}>
                            <h2>Great job! You have cleaned up all your tasks! 
                                <br />
                                <br />
                                It's time to <Link to='/new-job'>apply for more jobs</Link> or look at the <Link to='/job-list'>Job List</Link>!
                            </h2>
                        </Paper>
                    }
            </div>
        )
    }
}


const mapReduxStateToProps = reduxState => ({
    reduxState,
    status: reduxState.status
})
export default connect(mapReduxStateToProps)(FollowUp);