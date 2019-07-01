import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class JobDetail extends Component {
    //at page load, fetch the details from db
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ONE_JOB_DETAIL',
            payload: {id: this.props.match.params.id},
        });
    }

    handleGoToEdit = (id) => {
        console.log('in handle go to edit button');
        this.props.history.push(`/job-list/edit/${id}`);

    }
    render() {
        return (
            <div>
                <h2>Job Detail Page</h2>
                <pre>
                    {/* {JSON.stringify(this.props.history)} */}
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
                <button onClick={()=>this.handleGoToEdit(this.props.jobDetail.id)}>Edit</button>
                <Link to="/job-list"><button>Back to List</button></Link>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
    jobDetail: reduxState.jobList.jobDetailReducer,
})
export default connect(mapReduxStateToProps)(JobDetail);