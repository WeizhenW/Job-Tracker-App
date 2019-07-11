import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContactItem.css';

//material ui
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { Input } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
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
                            <h2>{this.props.contact.first_name} {this.props.contact.last_name}</h2>
                            <hr />
                                <span className="title">Company:</span>
                                {this.props.contact.company}
                                <br />
                                <span className="title">Job Title:</span>
                                {this.props.contact.job_title}
                                <br />
                                <span className="title">Phone:</span>
                                {this.props.contact.phone}
                                <br />
                                <span className="title">Email:</span>
                                {this.props.contact.email}
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
