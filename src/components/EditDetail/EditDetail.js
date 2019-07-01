import React, { Component } from 'react';
import { connect } from 'react-redux';



class EditDetail extends Component {
    //local state
    state = {
        job: this.props.jobDetail,
    }

    //at page load, fetch the details from db
    componentDidMount() {
        //fetch details for one job
        this.props.dispatch({
            type: 'FETCH_ONE_JOB_DETAIL',
            payload: {id: this.props.match.params.id},
        });
        //fetch full list of status
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        });
    }
  
    //get input and save to locals tate
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            job: {
                ...this.state.job,
                [propertyName]: event.target.value,
            }
        })
    }

    //dispatch to save new input to database
    handleSave = (id) => {
        this.props.dispatch({
            type: 'UPDATE_JOB_DETAIL',
            payload: this.state.job,
        })
        this.props.history.push(`/job-list/detail/${id}`);
    }
    

    render() {
        return (
            <div>
                <h2>Edit page</h2>
                <pre>
                    {JSON.stringify(this.props.jobDetail, null, 2)}
                    <br />
                    {JSON.stringify(this.state, null, 2)}
                </pre>
                <ul>
                    <li>Job Title: <input value={this.state.job.title} onChange={this.handleChangeFor('title')}/></li>
                    <li>Job Status: 
                    <select type="text" name="status" onChange={this.handleChangeFor('status_id')}>
                        {this.props.status.map(status => <option key={status.id} value={status.id}>{status.status_name}</option>)}
                    </select>
                    </li>
                    <li>Company Name: <input value={this.state.job.company} onChange={this.handleChangeFor('company')} /></li>
                    <li>Company Address: <input value={this.state.job.address || ''} onChange={this.handleChangeFor('address')} /></li>
                    <li>Post URL: <input value={this.state.job.post_url} onChange={this.handleChangeFor('post_url')} /></li>
                    <li>Email: <input value={this.state.job.email || ''} onChange={this.handleChangeFor('email')} /></li>
                    <li>Phone: <input value={this.state.job.phone || ''} onChange={this.handleChangeFor('phone')} /></li>
                    <li>Website: <input value={this.state.job.website || ''} onChange={this.handleChangeFor('website')}/></li>
                    <li>Comment: <input value={this.state.job.note || ''} onChange={this.handleChangeFor('note')}/></li>
                    <li>Skills: 
                        {this.props.jobDetail.skills && this.props.jobDetail.skills[0]?
                        <ul>{this.props.jobDetail.skills.map(i => <li key={i}>{i}</li>)}</ul>
                        :
                        'null'
                        }
                    </li>
                </ul>
                <button onClick={() => this.handleSave(this.state.job.id)}>Save</button>
                <button>Cancel</button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    jobDetail: reduxState.jobList.jobDetailReducer,
    status: reduxState.status,
})
export default connect(mapReduxStateToProps)(EditDetail);