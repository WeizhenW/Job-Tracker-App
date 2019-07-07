import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Input } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';



const styles = {
    // paper: {
    //     width: '80%',
    //     margin: '10px auto',
    //     padding: '100px',
    //     paddingTop: '20px',
    // },
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '22px',
        marginTop: '80px',
    },
    dropdown: {
        // marginTop: 10,
    },
    button: {
        marginTop: '30px',
        float:'right',
    },
    search: {
        marginTop: '30px',
    },
    searchResult: {
        marginTop: '50px',
    }
}

class SearchJob extends Component {
    state = {
        companyName: '',
        status_id: '',
        search: false,
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_STATUS',
        })
    }

    //function to get input value
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    //function to dispatch the action to search   
    handleSearch = (propertyName) => {
        this.setState({
            search: true,
        })
        if (propertyName === 'companyName') {
            this.props.dispatch({
                type: 'SEARCH_JOB_BY_COMPANY',
                payload: this.state
            })
        } else if (propertyName === 'status_id') {
            this.props.dispatch({
                type: 'SEARCH_JOB_BY_STATUS',
                payload: this.state,
            })
        }
    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {/* <Paper style={styles.paper}> */}
                        <div style={styles.title}>
                            <h2 >Search jobs in my pipeline</h2>
                        </div>
                        <div style={styles.search}>
                            <Grid container spacing={2}>
                                <Grid item xm={12} sm={5}>
                                    <TextField
                                        id="searchCompany"
                                        onChange={this.handleChangeFor('companyName')}
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.companyName}
                                        placeholder="Search by company name"
                                        fullWidth
                                    />
                                    <Button style={styles.button} onClick={() => this.handleSearch('companyName')} variant="contained">Go</Button>

                                </Grid>
                                <Grid item xm={12} sm={2}>
                                    <h4>OR</h4>
                                </Grid>

                                <Grid item xm={12} sm={5}>
                                    <FormControl style={styles.dropdown} fullWidth variant="outlined">
                                        <br />
                                        <InputLabel htmlFor="status">
                                            Search by job status
                                        </InputLabel>
                                        <Select
                                            onChange={this.handleChangeFor('status_id')}
                                            input={<OutlinedInput name="status" id="status" />}
                                            value={this.state.status_id}
                                        // name="status"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.props.reduxState.status.map(status => <MenuItem key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Button style={styles.button} onClick={() => this.handleSearch('status_id')} variant="contained">Go</Button>
                                </Grid>
                            </Grid>

                        </div>
                        <div >
                            {/* <pre>
                            {JSON.stringify(this.props.reduxState.search, null, 2)}
                            <br />
                            {JSON.stringify(this.state, null, 2)}
                        </pre> */}
                            {this.props.reduxState.search.searchResultReducer.data && this.props.reduxState.search.searchResultReducer.data.length ?

                                <Table style={styles.searchResult}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Job Title</TableCell>
                                            <TableCell>Company</TableCell>
                                            <TableCell>Post URL</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.reduxState.search.searchResultReducer.data.map(job =>
                                            <TableRow key={job.job_id}>
                                                <TableCell><Link to={`/job-list/detail/${job.job_id}`} >
                                                    {job.title}
                                                </Link></TableCell>
                                                <TableCell>
                                                    {job.company}
                                                </TableCell>
                                                <TableCell>
                                                    <a href={job.post_url}>Go to the post</a>
                                                </TableCell>
                                                <TableCell>
                                                    {job.status_name}
                                                </TableCell>
                                            </TableRow>)}
                                    </TableBody>
                                </Table>
                                :
                                this.state.search?
                                <h4>No Result Found - Please Try Again</h4>
                                :
                                ''
                            }
                        </div>
                        {/* </Paper> */}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(SearchJob);