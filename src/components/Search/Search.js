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
    paper: {
        width: '80%',
        margin: '10px auto',
        padding: '100px',
        paddingTop: '20px',
    },
}

class SearchJob extends Component {
    state = {
        companyName: '',
        status_id: '',
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
                    <Grid item xs={12} sm={3}>
                        this is the side
                        <br />
                        i don't know what to put
                        <br />
                        i am stuck with styling
                        </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper style={styles.paper}>
                            <div>
                                <TextField
                                    id="searchCompany"
                                    onChange={this.handleChangeFor('companyName')}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.companyName}
                                    placeholder="Search by company name"
                                    fullWidth
                                />
                                <Button onClick={() => this.handleSearch('companyName')} variant="contained">Go</Button>
                                <h3>OR</h3>
                                <FormControl fullWidth variant="outlined">
                                    <br />
                                    <InputLabel htmlFor="status">
                                        Search by job status
                            </InputLabel>
                                    <Select
                                        onChange={this.handleChangeFor('status_id')}
                                        input={<OutlinedInput name="status" id="status" />}
                                        displayEmpty
                                        value={this.state.status_id}
                                        // variant="outlined"
                                        name="status"
                                    >
                                        <MenuItem value="">
                                            <em></em>
                                        </MenuItem>
                                        {this.props.reduxState.status.map(status => <MenuItem key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Button onClick={() => this.handleSearch('status_id')} variant="contained">Go</Button>

                            </div>
                            <div>
                                {/* <pre>
                            {JSON.stringify(this.props.reduxState.search, null, 2)}
                            <br />
                            {JSON.stringify(this.state, null, 2)}
                        </pre> */}
                                {this.props.reduxState.search.searchResultReducer.data && this.props.reduxState.search.searchResultReducer.data.length ?

                                    <Table>
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
                                    'no result found'
                                }
                            </div>
                        </Paper>
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