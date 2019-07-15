import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import WebScrapingItem from '../WebScrapingItem/WebScrapingItem';

//material ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
        color: '#333333',
        fontSize: '24px',
    },
    tableHeader: {
        fontSize: '20px',
        backgroundColor: '#5AB5D1',
        color: 'white',
        fontWeight: 800,
    },
    tableBody: {
        fontSize: '18px',
    },
    jobTitle: {
        fontSize: '18px',
    },
    button: {
        fontSize: '12px',
    },
    searchKeyword: {
        marginTop: '30px',
    }
}

class WebScraping extends Component {
    state = {
        jobs: [],

    }
    //get request to server to fetch jobs from indeed
    handleGetJobs = (propertyName) => {
        this.setState({
            jobs: [],
        })
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
                            <Grid item sm={12}>
                                <h2>Click a button to fetch the latest jobs from Indeed</h2>
                            </Grid>
                            <Grid item sm={4}>
                                <Button variant="contained" color="secondary" onClick={() => this.handleGetJobs('javascript')}>JavaScript Developer</Button>
                            </Grid>
                            <Grid item sm={4}>
                                <Button variant="contained" color="secondary" onClick={() => this.handleGetJobs('frontend')}>Front End Developer</Button>
                            </Grid>
                            <Grid item sm={4}>
                                <Button variant="contained" color="secondary" onClick={() => this.handleGetJobs('software')}>Software Engineer</Button>
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
                                        {this.state.jobs.map(job => <WebScrapingItem job={job} />)}
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