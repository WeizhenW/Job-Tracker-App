import React, { Component } from 'react';


class InputJob extends Component {
    render() {
        return (
            <div>
                <h2>Enter a new InputJob</h2>
                <form>
                    Company Name:
                    <input type="text" name="companyName" /><br />
                    Job Title:
                    <input type="text" name="jobTitle" /><br />
                    Post URL:
                    <input type="text" name="postUrl" /><br />
                    Status:
                    <select type="text" name="status">
                        <option value="new">New</option>
                        <option value="applied">Applied</option>
                        <option value="phone">Phone Interview</option>
                        <option value="onsite">Onsite Interview</option>
                        <option value="reject">Reject</option>
                        <option value="offer">Offer</option>
                    </select>
                    
                    <br />
                    <br />
                    <input type="submit" value="Cancel" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default InputJob;
