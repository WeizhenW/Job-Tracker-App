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
        fontSize: '28px'
    },
    button: {
        marginLeft: '150px',
    },
 
    paper: {
        width: '80%',
        margin: '10px auto',
        padding: '100px',
        paddingTop: '50px',
    },
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
                    <Grid item xs={12} sm={3}>
                        this is the side
                        <br />
                        i don't know what to put
                        <br />
                        i am stuck with styling
                        </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper style={styles.paper}>
                            <div style={styles.title}>
                                <h2>My Job List</h2>
                            </div>
                            <div style={styles.buttonDiv}>
                            {this.state.toApplyButtonClicked ?
                            <>
                                <Button onClick={() => this.handleClick('toApply')} style={styles.button} color="primary" variant="contained">View Jobs To Apply</Button>
                                <Button onClick={() => this.handleClick('applied')} style={styles.button}  variant="contained">View Applied Jobs</Button>                                
                            </>
                            :
                            <>
                                <Button onClick={() => this.handleClick('toApply')} style={styles.button}  variant="contained">View Jobs To Apply</Button>
                                <Button onClick={() => this.handleClick('applied')} style={styles.button} color="primary" variant="contained">View Applied Jobs</Button>
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
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MyJobList;