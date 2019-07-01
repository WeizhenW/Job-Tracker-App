import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class MyJobList extends Component {
    
    render() {
        return (
            <div>
                <h2>My Job List</h2>
                <Link to='/job-list/to-apply'><button>Jobs To Apply</button></Link>
                <br />
                <br />
                <Link to='/job-list/applied'><button>Applied Jobs</button></Link>
                 
            </div>
        )
    }
}

export default MyJobList;