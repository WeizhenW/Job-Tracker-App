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

class ContactItem extends Component {
    state = {
        showNote: false,
    }

    handleClick = () => {
        console.log('clicked');
        this.setState({
            showNote: !this.state.showNote,
        })
    }

    render() {
        return (

            <Card onClick={this.handleClick}>
                <CardContent>
                    {this.state.showNote ?
                        <h4>Note: {this.props.contact.note}</h4>
                        :
                        <>
                            <h3>{this.props.contact.first_name} {this.props.contact.last_name}</h3>
                            <h4>Company: {this.props.contact.company}</h4>
                            <h4>Title: {this.props.contact.job_title}</h4>
                            <h4>Phone: {this.props.contact.phone}</h4>
                            <h4>Email: {this.props.contact.email}</h4>
                        </>
                    }
                </CardContent>
            </Card>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(ContactItem);
