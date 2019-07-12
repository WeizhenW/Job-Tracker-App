import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';


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
        marginTop: '30px',
        marginLeft: '200px',
    },
    addContactBtn: {
        marginTop: '20px',
    }
};

class ContactEntry extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_CONTACT'
        })
    }

    state = {
        contact_id: '',
        displayMessage: false,
    }

    handleChange = (event) => {
        this.setState({
            contact_id: event.target.value,
        })
    }

    handleSubmit = () => {
        console.log('in submit')
        this.props.dispatch({
            type: 'ADD_CONTACT_TO_JOB',
            payload: {
                job_id: this.props.job_id,
                contact_id: this.state.contact_id,
            }
        })
        this.setState({
            displayMessage: true,
            contact_id: '',
        })
    }

    render() {
        return (
            <div>
                {/* <pre>
                    {JSON.stringify(this.state)}
                </pre> */}
                <FormControl style={styles.dropdown} fullWidth variant="outlined">
                    <InputLabel htmlFor="contact">
                        Select a contact
                    </InputLabel>
                    <Select
                        onChange={this.handleChange}
                        input={<OutlinedInput name="contact" id="contact" />}
                        value={this.state.contact_id}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.props.reduxState.contact.contactReducer.map(contact => <MenuItem key={contact.id} value={contact.id}>{contact.first_name} {contact.last_name}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button variant="outlined" color="primary" style={styles.addContactBtn} onClick={this.handleSubmit}>Add Contact</Button>
                {this.state.displayMessage ?
                    'Contact added'
                    :
                    ''
                }
            </div>

        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(ContactEntry);
