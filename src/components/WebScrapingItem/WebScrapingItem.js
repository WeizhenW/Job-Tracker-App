import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui
import Button from '@material-ui/core/Button';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

//import sweetalert2
import Swal from 'sweetalert2'

class WebScraping extends Component {
    state = {
        added: false,
    }

    handleMove = (job) => {
        this.props.dispatch({
            type: 'POST_NEW_JOB',
            payload: {
                // history: this.props.history,
                job: {
                    companyName: job.company,
                    jobTitle: job.title,
                    postUrl: job.href,
                    status_id: 1
                },
            }
        })
        Swal.fire({
            text: 'Job added to the backlog!',
            type: 'success'
        })
        this.setState({
            added: true,
        })
    }
    render() {
        return (
            <TableRow key={this.props.job.href}>
                <TableCell>{this.props.job.title}</TableCell>
                <TableCell><a href={this.props.job.href} target="_blank">See Job Post</a></TableCell>
                <TableCell>{this.props.job.company}</TableCell>
                <TableCell>
                    {this.state.added ?
                        <Button variant="outlined" color="secondary" disabled onClick={() => this.handleMove(this.props.job)}>Add</Button>
                        :
                        <Button variant="outlined" color="secondary" onClick={() => this.handleMove(this.props.job)}>Add</Button>
                    }
                </TableCell>
            </TableRow>)
    }
}


const mapReduxStateToProps = reduxState => ({
    jobDetail: reduxState.jobList.jobDetailReducer,
    status: reduxState.status,
})
export default connect(mapReduxStateToProps)(WebScraping);