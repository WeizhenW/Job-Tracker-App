import React, { Component } from 'react';
import { connect } from 'react-redux';


class JobDetail extends Component {
    render() {
        return (
            <div>
                <h2>Job Detail Page</h2>
                <pre>
                    {JSON.stringify(this.props.reduxState.jobList.jobDetailReducer, null, 2)}
                </pre>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(JobDetail);