import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//material ui
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        width: '80%',
    },
    dropdown: {
        marginTop: 10,
    },

    title: {
        textAlign: 'center',
        color: '#F7882F',
        fontSize: '22px',
        marginTop: '80px',
    },
    button: {
        // display: 'inline-flex',
        marginTop: '30px',
        marginLeft: '200px',
    },
};

class ContactDisplay extends Component {
    //in component did mount => fetch all status to populate the ddl
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_CONTACT',
        })
    };
    //local state to temporarily hold the inputs
    state = {
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        phone: '',
        email: '',
        note: '',
        role: '',
    }


    render() {
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.reduxState.contact)}
                </pre>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div style={styles.title}>
                            <h2 >Directory </h2>
                        </div>
                        <Grid container spacing={2}>
                            {this.props.reduxState.contact.map(contact =>
                                <Grid item xs={12} sm={4}>
                                    <Card>
                                        <CardContent>
                                            <h3>{contact.first_name} {contact.last_name}</h3>
                                            <h4>Company: {contact.company}</h4>
                                            <h4>Phone: {contact.phone}</h4>
                                            <h4>Email: {contact.email}</h4>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}

                        </Grid>
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
export default connect(mapReduxStateToProps)(ContactDisplay);
