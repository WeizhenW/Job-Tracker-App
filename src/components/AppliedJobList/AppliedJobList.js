import React, { Component } from 'react';
import { connect } from 'react-redux';

class AppliedList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_APPLIED_JOBS_LIST' });
    }
    //function to move jobs to applied list
    handleMove = (job) => {
        this.props.dispatch({
            type: 'UPDATE_JOB_STATUS',
            payload: {
                job_id: job.id,
                status_id: 1,
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

    render() {
        return (
            <div>
                <h2>List of jobs to apply</h2>
                <pre>
                    {/* {JSON.stringify(this.props.reduxState.jobList.appliedJobsListReducer, null, 2)} */}
                </pre>
                <div className="jobList">
                    <ul>
                        {this.props.reduxState.jobList.appliedJobsListReducer.map(job => <li key={job.id}>
                            {job.title} -
                        {job.company} -
                        {job.post_url} -
                        <button onClick={() => this.handleMove(job)}>Move</button>
                            -
                        <button onClick={() => this.handleDelete(job)}>Delete</button>
                            -
                        <button>Detail</button>
                        </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(AppliedList);