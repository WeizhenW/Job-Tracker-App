import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewJobList extends Component {
    componentDidMount() {
        this. props.dispatch({type: 'FETCH_NEW_JOBS_LIST'});
    }
    //function to move jobs to applied list
    handleMove = () => {
        console.log('in move');
    }

    //function to delete job
    handleDelete = (job) => {
        console.log('in delete');
        console.log(job);
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
                    {JSON.stringify(this.props.reduxState.newJobs, null, 2)}
                </pre>
                <div className="jobList">
                    <ul>
                    {this.props.reduxState.newJobs.map(job => <li key={job.id}>
                        {job.title} - 
                        {job.company} - 
                        {job.post_url} - 
                        <button onClick={() => this.handleMove(job)}>Move</button>
                        -
                        <button onClick={() => this.handleDelete(job)}>Delete</button>
                    </li> )}

                    </ul>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(NewJobList);