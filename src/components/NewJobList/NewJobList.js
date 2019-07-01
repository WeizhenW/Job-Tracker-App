import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewJobList extends Component {
    componentDidMount() {
        this. props.dispatch({type: 'FETCH_NEW_JOBS_LIST'});
    }
    render() {
        return (
            <div>
                <h2>List of jobs to apply</h2>
                <pre>
                    {JSON.stringify(this.props.reduxState.newJobs, null, 2)}
                </pre>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(NewJobList);