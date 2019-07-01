import React, { Component } from 'react';
import { connect } from 'react-redux';


class JobDetail extends Component {
    render() {
        return (
            <div>
                <h2>Job Detail Page</h2>
                <pre>
                    {JSON.stringify(this.props.jobDetail, null, 2)}
                </pre>
                <ul>
                    <li>Job Title: {this.props.jobDetail.title}</li>
                    <li>Job Status: {this.props.jobDetail.status_name}</li>
                    <li>Company Name: {this.props.jobDetail.company}</li>
                    <li>Company Address: {this.props.jobDetail.address}</li>
                    <li>Post URL: {this.props.jobDetail.post_url}</li>
                    <li>Email: {this.props.jobDetail.email}</li>
                    <li>Phone: {this.props.jobDetail.phone}</li>
                    <li>Website: {this.props.jobDetail.website}</li>
                    <li>Comment: {this.props.jobDetail.note}</li>
                    <li>Skills: 
                        {this.props.jobDetail.skills && this.props.jobDetail.skills[0]?
                        <ul>{this.props.jobDetail.skills.map(i => <li key={i}>{i}</li>)}</ul>
                        :
                        'null'
                        }
                    </li>
                </ul>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    jobDetail: reduxState.jobList.jobDetailReducer,
})
export default connect(mapReduxStateToProps)(JobDetail);