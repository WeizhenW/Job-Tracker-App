import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


//material ui
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//import sweetalert2
import Swal from 'sweetalert2'


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        margin: '30px auto'
    },
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '24px',
    },
    tableHeader: {
        fontSize: '16px',
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 600,
    },
    tableBody: {
        fontSize: '16px',
    },
    jobTitle: {
        fontSize: '16px',
    },
    button: {
        fontSize: '10px',
    },
    searchKeyword: {
        marginTop: '30px',
    }
}

class WebScraping extends Component {
    state = {
        jobs: [],

    }

    handleGetJobs = (propertyName) => {
        axios.get(`/api/scraping/${propertyName}`)
            .then(
                response => {
                    this.setState({
                        jobs: response.data
                    })
                }
            )
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
    }
    render() {
        return (
            <div >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8} >
                        <div style={styles.title}>
                            <h2>Indeed Job Search</h2>
                        </div>
                            <Grid container spacing={3} style={styles.searchKeyword}>
                                
                                <Grid item sm={4}>
                                    <Button variant="contained" onClick={() => this.handleGetJobs('javascript')}>JavaScript Developer</Button>
                                </Grid>
                                <Grid item sm={4}>
                                </Grid>
                                <Grid item sm={4}>
                                    <Button variant="contained" onClick={() => this.handleGetJobs('software')}>Software Engineer</Button>
                                </Grid>
                            </Grid>
                        <div style={styles.container}>
                            {this.state.jobs.length ?
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={styles.tableHeader} >Job Title</TableCell>
                                            <TableCell style={styles.tableHeader}>URL</TableCell>
                                            <TableCell style={styles.tableHeader}>Company</TableCell>
                                            <TableCell style={styles.tableHeader}>Add to List</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.jobs.map(job => <TableRow key={job.href}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell><a href={job.href} target="_blank">See Job Post</a></TableCell>
                                            <TableCell>{job.company}</TableCell>
                                            <TableCell><Button variant="contained" onClick={() => this.handleMove(job)}>Add</Button></TableCell>
                                        </TableRow>)}
                                    </TableBody>
                                </Table>
                            :
                            ''
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
                {/* <pre>
                    {JSON.stringify(this.state.jobList, null, 2)}
                </pre> */}
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    jobDetail: reduxState.jobList.jobDetailReducer,
    status: reduxState.status,
})
export default connect(mapReduxStateToProps)(WebScraping);