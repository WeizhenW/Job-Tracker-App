import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppliedJobs from '../AppliedJobList/AppliedJobList';
import NewJobs from '../NewJobList/NewJobList';

//material ui
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = {
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '22px',
        marginTop: '80px',
    },
    button1: {
        // marginLeft: '100px',
        marginTop: '50px',
        float:'left'
    },
    button2: {
        // marginLeft: '100px',
        marginTop: '50px',
        float:'right'
    },

    // paper: {
    //     width: '80%',
    //     margin: '10px auto',
    //     padding: '100px',
    //     paddingTop: '50px',
    // },
}

class MyJobList extends Component {

    state = {
        toApplyButtonClicked: true,
        appliedButtonClicked: false,
    }

    handleClick = (type) => {
        if (type === 'toApply') {
            this.setState({
                toApplyButtonClicked: true,
                appliedButtonClicked: false,
            })

        } else {
            this.setState({
                toApplyButtonClicked: false,
                appliedButtonClicked: true,
            })
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    {/* <Paper style={styles.paper}> */}
                    <Grid item xs={12} sm={8}>
                        <div>
                            {this.state.toApplyButtonClicked ?
                                <>
                                    <Grid container spacing={1}>
                                        <Grid item sm={2}>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <div style={styles.title}>
                                                <h2>My Job Application Backlog</h2>
                                            </div>
                                            <Button onClick={() => this.handleClick('toApply')} style={styles.button1} color="primary" variant="contained">Backlog</Button>
                                            <Button onClick={() => this.handleClick('applied')} style={styles.button2} variant="contained">Applied Jobs</Button>
                                        </Grid>
                                        <Grid item sm={2}>
                                        </Grid>
                                    </Grid>

                                </>
                                :
                                <>
                                <Grid container spacing={1}>
                                <Grid item sm={2}>
                                </Grid>
                                <Grid item sm={8}>
                                    <div style={styles.title}>
                                        <h2>My Applied Job List</h2>
                                    </div>
                                    <Button onClick={() => this.handleClick('toApply')} style={styles.button1} variant="contained">Backlog</Button>
                                    <Button onClick={() => this.handleClick('applied')} style={styles.button2} color="primary" variant="contained">Applied Jobs</Button>
                                    </Grid>
                                        <Grid item sm={2}>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                            <br />
                            <br />
                        </div>
                        {/* <pre>
                            {JSON.stringify(this.state)}
                            </pre> */}
                        {this.state.toApplyButtonClicked ?
                            <NewJobs history={this.props.history} />
                            :
                            <AppliedJobs history={this.props.history} />
                        }
                    </Grid>

                    {/* </Paper> */}
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MyJobList;