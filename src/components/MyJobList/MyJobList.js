import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import AppliedJobs from '../AppliedJobList/AppliedJobList';
import NewJobs from '../NewJobList/NewJobList';

//material ui
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = {
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '24px',
    },
    
}

class MyJobList extends Component {

    state = {
        display: 'backlog',
    }

    handleChange = (event) => {
        this.setState({
            display: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="job"
                                name="job"
                                value={this.state.display}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel
                                    value='backlog'
                                    control={<Radio color="primary" />}
                                    label="Backlog"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value='applied'
                                    control={<Radio color="primary" />}
                                    label="Applied"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        </FormControl>
                        <div>
                            {this.state.display === 'backlog' ?
                                <>
                                    <Grid container spacing={1}>
                                        <Grid item sm={2}>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <div style={styles.title}>
                                                <h2>My Job Application Backlog</h2>
                                            </div>
                                            {/* <Button onClick={() => this.handleClick('toApply')} style={styles.button1} color="primary" variant="contained">Backlog</Button> */}
                                            {/* <Button onClick={() => this.handleClick('applied')} style={styles.button2} variant="contained">Applied Jobs</Button> */}
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
                                            {/* <Button onClick={() => this.handleClick('toApply')} style={styles.button1} variant="contained">Backlog</Button> */}
                                            {/* <Button onClick={() => this.handleClick('applied')} style={styles.button2} color="primary" variant="contained">Applied Jobs</Button> */}
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
                        {this.state.display === 'backlog' ?
                            <NewJobs history={this.props.history} />
                            :
                            <AppliedJobs history={this.props.history} />
                        }
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MyJobList;