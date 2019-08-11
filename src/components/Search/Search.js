import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';



const styles = {
    title: {
        textAlign: 'center',
        color: '#333333',
        fontSize: '24px',
    },
    dropdown: {
        // marginTop: 10,
    },
    button: {
        marginTop: '30px',
        float: 'right',
    },
    search: {
        marginTop: '30px',
    },
    searchResult: {
        marginTop: '50px',
    },
    tableHeader: {
        fontSize: '20px',
        backgroundColor: '#5AB5D1',
        color: 'white',
        fontWeight: 800,
    },
    tablebody: {
        fontSize: '16px',
    },
}

class SearchJob extends Component {
    state = {
        companyName: '',
        status_id: '',
        search: false,
        searchBy: 'company',
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
    handleSearch = () => {
        this.setState({
            search: true,
        })
        if (this.state.searchBy === 'company') {
            this.props.dispatch({
                type: 'SEARCH_JOB_BY_COMPANY',
                payload: this.state
            })
        } else if (this.state.searchBy === 'status') {
            this.props.dispatch({
                type: 'SEARCH_JOB_BY_STATUS',
                payload: this.state,
            })
        }
    }

    handleSelect = (event) => {
        console.log(event.target);
        this.setState({
            searchBy: event.target.value,
        });
    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div style={styles.title}>
                            <h2 >Search Jobs in My Job List</h2>
                        </div>
                        <div style={styles.search}>
                            <Grid container spacing={4}>
                                <Grid item xm={12} sm={4}>
                                    <FormControl style={styles.search} fullWidth>
                                        <Select
                                            onChange={this.handleSelect}
                                            value={this.state.searchBy}
                                            input={<OutlinedInput name="search" id="search" />}
                                        >
                                            <MenuItem value="status">
                                                <em>Job Status</em>
                                            </MenuItem>
                                            <MenuItem value="company">
                                                <em>Company Name</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xm={12} sm={8}>
                                    {this.state.searchBy === 'company' ?
                                        <TextField
                                            id="searchCompany"
                                            onChange={this.handleChangeFor('companyName')}
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.companyName}
                                            style={styles.search}
                                            placeholder="Enter Company Name"
                                            fullWidth
                                        />
                                        :
                                        <FormControl style={styles.search} fullWidth>
                                            <InputLabel htmlFor="status">
                                                Select Job Status
                                            </InputLabel>
                                            <Select
                                                onChange={this.handleChangeFor('status_id')}
                                                input={<OutlinedInput name="status" id="status" />}
                                                value={this.state.status_id}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {this.props.reduxState.status.map(status => <MenuItem key={status.id} value={status.id}>{status.status_name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    }
                                    <Button style={styles.button} onClick={this.handleSearch} color="secondary" variant="contained">Go</Button>
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
                                            <TableCell style={styles.tableHeader}>Job Title</TableCell>
                                            <TableCell style={styles.tableHeader}>Company</TableCell>
                                            <TableCell style={styles.tableHeader}>Post URL</TableCell>
                                            <TableCell style={styles.tableHeader}>Application Date</TableCell>
                                            <TableCell style={styles.tableHeader}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.reduxState.search.searchResultReducer.data.map(job =>
                                            <TableRow key={job.job_id}>
                                                <TableCell style={styles.tablebody}><Link to={`/job-list/detail/${job.job_id}`} >
                                                    {job.title}
                                                </Link></TableCell>
                                                <TableCell style={styles.tablebody}>
                                                    {job.company}
                                                </TableCell>
                                                <TableCell style={styles.tablebody}>
                                                    <a href={job.post_url}>Go to the post</a>
                                                </TableCell>
                                                <TableCell style={styles.tablebody}>
                                                    {job.application_date}
                                                </TableCell>
                                                <TableCell style={styles.tablebody}>
                                                    {job.status_name}
                                                </TableCell>
                                            </TableRow >)}
                                    </TableBody>
                                </Table>
                                :
                                this.state.search ?
                                    <h4>No Result Found - Please Try Again</h4>
                                    :
                                    ''
                            }
                        </div>
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