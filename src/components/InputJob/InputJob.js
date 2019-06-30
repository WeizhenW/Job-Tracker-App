import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class InputJob extends Component {
    //in component did mount => fetch all status to populate the ddl
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        })
    };
    //local state to temporarily hold the inputs
    state = {
        companyName: '',
        jobTitle: '',
        postUrl: '',
        status_id: '',
    }
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }
    //on click => dispatch action to post
    handleSubmit = () => {
        if(this.state.companyName && this.state.jobTitle && this.state.postUrl && this.state.status_id) {
            this.props.dispatch({
                type: 'POST_NEW_JOB',
                payload: this.state,
            })
        } else {
            alert ('input field cannot be empty');
            return;
        }
  
    }


    render() {
        return (
            <div>
                <h2>Enter a New Job</h2>
                <pre>
                    {JSON.stringify(this.state)}
                </pre>
                <form onSubmit={this.handleSubmit}>
                    <label>Company Name:</label>
                    <input onChange={this.handleChangeFor('companyName')} type="text" name="companyName" /><br />
                    <label>Job Title:</label>
                    <input onChange={this.handleChangeFor('jobTitle')} type="text" name="jobTitle" /><br />
                    <label>Post URL:</label>
                    <input onChange={this.handleChangeFor('postUrl')} type="text" name="postUrl" /><br />
                    <label>Status:</label>
                    <select type="text" name="status" onChange={this.handleChangeFor('status_id')}>
                        {this.props.reduxState.status.map(status => <option key={status.id} value={status.id}>{status.status_name}</option>)}
                    </select>

                    <br />
                    <br />
                    <Link to='/home'><button>Cancel</button></Link>
                    <input type="submit" value="Submit" />
                </form>
                <pre>
                    {/* {JSON.stringify(this.props.reduxState.status, null, 2)} */}
                </pre>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(InputJob);
