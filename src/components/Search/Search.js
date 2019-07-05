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

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = {
    tableHeader: {
        fontSize: '16px',
        backgroundColor: 'black',
        color: 'white',
    },
    tableBody: {
        fontSize: '14px',
    },
    jobTitle: {
        fontSize: '14px',
    },
    button: {
        fontSize: '10px',
    },
    paper: {
        width: '80%',
        margin: '10px auto',
        padding: '100px',
        paddingTop: '20px',
    },
    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '28px'
    },
    announce: {
        color: '#F7882F',
    }
}

class SearchJob extends Component {
    state = {
        companyName: '',
    }
    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_FOLLOW_UP_LIST' });
        // this.props.dispatch({
        //     type: 'FETCH_ALL_STATUS',
        // });
        //fetch full list of status
        // this.props.dispatch({
        //     type: 'FETCH_ALL_STATUS',
        // });
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
        }
    }



    render() {
        return (

            <div>
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
                    </div>
                    <div>
                        <pre>
                            {JSON.stringify(this.props.reduxState.search)}
                        </pre>
                        {this.props.reduxState.search.searchByCompanyReducer.data && this.props.reduxState.search.searchByCompanyReducer.data.length?
                        
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
                                {this.props.reduxState.search.searchByCompanyReducer.data.map(job =>
                                    <TableRow key={job.id}>
                                        <TableCell>
                                            {job.title}
                                        </TableCell>
                                        <TableCell>
                                            {job.title}
                                        </TableCell>
                                        <TableCell>
                                            {job.post_url}
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
            </div>
        )
    }
}


const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(SearchJob);