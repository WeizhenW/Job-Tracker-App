import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import LinkIcon from '@material-ui/icons/Link';


const styles = {
    tableHeader: {
        fontSize: '16px',
        backgroundColor: 'black',
        color: 'white',
    },
    tableBody: {
        fontSize: '14px',
    },
    jobTitle: {
        fontSize: '14px',
    },
    button: {
        fontSize: '10px',
    },
    specialFont: {
        fontSize: '12px',
    },
}

class AppliedList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_APPLIED_JOBS_LIST' });
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
        this.props.dispatch({
            type: 'DELETE_JOB',
            payload: job,
        })
    }

    //function to get job details for one job
    handleGetDetail = (job) => {
        this.props.history.push(`/job-list/detail/${job.id}`);
    }

    render() {
        return (
            <div>
                <pre>
                    {/* {JSON.stringify(this.props.reduxState.jobList.appliedJobsListReducer, null, 2)} */}
                </pre>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.tableHeader} >Job Title</TableCell>
                            <TableCell style={styles.tableHeader}>company</TableCell>
                            <TableCell style={styles.tableHeader}>Post URL</TableCell>
                            <TableCell style={styles.tableHeader}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxState.jobList.appliedJobsListReducer.map(job => <TableRow key={job.id}>
                            <TableCell style={styles.jobTitle}><Link to={`/job-list/detail/${job.id}`} >{job.title}</Link></TableCell>
                            <TableCell style={styles.tableBody}>{job.company}</TableCell>
                            <TableCell style={styles.tableBody}><a href={job.post_url} target="_blank"><LinkIcon /> </a></TableCell>
                            <TableCell style={styles.tableBody}>
                                <Select
                                    variant="outlined"
                                    id="status"
                                    name="status"
                                    input={<OutlinedInput name="status" id="status" />}
                                    value={job.status_id}
                                    onChange={this.handleChange(job)}
                                    style={styles.specialFont}
                                    fullWidth
                                >
                                    {this.props.status.map(status => <MenuItem style={styles.specialFont} key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                </Select>               
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
    status: reduxState.status
})
export default connect(mapReduxStateToProps)(AppliedList);