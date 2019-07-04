import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = {
    tableHeader: {
        fontSize: '16px',
        backgroundColor: 'black',
        color: 'white',
    },
    tableBody: {
        fontSize: '14px',
    },
    button: {
        fontSize: '10px',
    }
}

class NewJobList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_NEW_JOBS_LIST' });
    }
    //function to move jobs to applied list
    handleMove = (job) => {
        this.props.dispatch({
            type: 'UPDATE_JOB_STATUS',
            payload: {
                job_id: job.id,
                status_id: 2
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
        this.props.history.push(`/job-list/detail/${job.id}`)
    }

    render() {
        return (
            <div>
                <h2>List of jobs to apply</h2>
                <pre>
                    {/* {JSON.stringify(this.props.reduxState.jobList, null, 2)} */}
                </pre>

                <Table style={styles.table}>
                    <colgroup>
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                    </colgroup>
                    <TableHead>
                        <TableRow >
                            <TableCell style={styles.tableHeader} >Job Title</TableCell>
                            <TableCell style={styles.tableHeader}>Company</TableCell>
                            <TableCell style={styles.tableHeader} >Post URL</TableCell>
                            <TableCell style={styles.tableHeader}>Applied?</TableCell>
                            <TableCell style={styles.tableHeader}>Delete</TableCell>
                            {/* <TableCell style={styles.tableHeader}>Detail</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxState.jobList.newJobsListReducer.map(job => <TableRow key={job.id}>
                            <TableCell style={styles.tableBody}><Link to={`/job-list/detail/${job.id}`} >{job.title}</Link></TableCell>
                            <TableCell style={styles.tableBody}>{job.company}</TableCell>
                            <TableCell style={styles.tableBody}>{job.post_url}</TableCell>
                            <TableCell style={styles.tableBody}><Button style={styles.button} variant="contained" onClick={() => this.handleMove(job)}> Done </Button></TableCell>
                            <TableCell style={styles.tableBody}><Button style={styles.button} variant="contained" onClick={() => this.handleDelete(job)}>Delete</Button></TableCell>
                            {/* <TableCell style={styles.tableBody}><Button style={styles.button} variant="contained" onClick={() => this.handleGetDetail(job)} id={job.id}>Go</Button></TableCell> */}
                        </TableRow>)}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(NewJobList);