import React, { Component } from 'react';
import { connect } from 'react-redux';

class InputJob extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        })
    }
    render() {
        return (
            <div>
                <h2>Enter a New Job</h2>
                <form>
                    Company Name:
                    <input type="text" name="companyName" /><br />
                    Job Title:
                    <input type="text" name="jobTitle" /><br />
                    Post URL:
                    <input type="text" name="postUrl" /><br />
                    Status:
                    <select type="text" name="status">
                        {this.props.reduxState.status.map(status => <option key={status.id}>{status.status_name}</option>)}
                    </select>
                    
                    <br />
                    <br />
                    <input type="submit" value="Cancel" />
                    <input type="submit" value="Submit" />
                </form>
                <pre>
                    {JSON.stringify(this.props.reduxState.status, null, 2)}
                </pre>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(InputJob);
