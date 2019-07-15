import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
//sweet alert
import Swal from 'sweetalert2'

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import LinkIcon from '@material-ui/icons/Link';



const styles = {
    tableHeader: {
        fontSize: '20px',
        backgroundColor: '#5AB5D1',
        fontWeight: 800,
        color: 'white',
    },
    tableBody: {
        fontSize: '16px',
    },
    jobTitle: {
        fontSize: '16px',
        textDecoration: 'underline',
    },
    table: {
        marginBottom: '50px',
    },
    specialFont: {
        fontSize: '16px',
    },
    deleteButton: {
        color: '#FC574E',
        fontSize: '28px'
    }
}

class NewJobList extends Component {
    componentDidMount() {
        //list of jobs with status = new
        this.props.dispatch({ type: 'FETCH_NEW_JOBS_LIST' });
        //fetch full list of status
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
                job_id: job.id
            },
        })
    }

    //function to delete job
    handleDelete = (job) => {
        //add sweet alert
        Swal.fire({
            // title: 'Are you sure?',
            text: 'You will delete the job',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No, keep it',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_JOB',
                    payload: job,
                })
            } 
          })    
    }

    //function to get job details for one job
    handleGetDetail = (job) => {
        this.props.history.push(`/job-list/detail/${job.id}`)
    }

    render() {
        return (
            <div>
                {/* <pre> */}
                    {/* {JSON.stringify(this.props.reduxState.jobList.newJobsListReducer, null, 2)} */}
                    {/* {JSON.stringify(this.state, null, 2)} */}
                {/* </pre> */}

                <Table style={styles.table}>
                    <TableHead>
                        <TableRow >
                            <TableCell style={styles.tableHeader} >Job Title</TableCell>
                            <TableCell style={styles.tableHeader}>Company</TableCell>
                            <TableCell style={styles.tableHeader} >Post URL</TableCell>
                            <TableCell style={styles.tableHeader}>Status</TableCell>
                            <TableCell style={styles.tableHeader}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxState.jobList.newJobsListReducer.map(job => <TableRow key={job.id}>
                            <TableCell style={styles.jobTitle}><Link to={`/job-list/detail/${job.id}`} >{job.title}</Link></TableCell>
                            <TableCell style={styles.tableBody}>{job.company}</TableCell>
                            <TableCell style={styles.tableBody}><a href={job.post_url} target="_blank"><LinkIcon /></a></TableCell>
                            <TableCell style={styles.tableBody}>
                                <Select
                                    id="status"
                                    name="status"
                                    input={<OutlinedInput name="status" id="status" />}
                                    value={job.status_id}
                                    style={styles.specialFont}
                                    onChange={this.handleChange(job)}
                                    fullWidth
                                >
                                    {this.props.status.map(status => <MenuItem style={styles.specialFont} key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                </Select>                               
                            </TableCell>
                            <TableCell style={styles.tableBody}>
                                <DeleteRoundedIcon style={styles.deleteButton} onClick={() => this.handleDelete(job)} />
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
    status: reduxState.status,
})
export default connect(mapReduxStateToProps)(NewJobList);