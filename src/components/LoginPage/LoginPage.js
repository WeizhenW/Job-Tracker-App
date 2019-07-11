import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import Techniques from '../Techniques/Techniques';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="upperPage">
          <Grid container spacing={2}>
            <Grid item sm={4}>
            </Grid>
            <Grid item sm={4}>
              <div >
                {this.props.errors.loginMessage && (
                  <h2
                    className="alert"
                    role="alert"
                  >
                    {this.props.errors.loginMessage}
                  </h2>
                )}
                <form className='loginBox' onSubmit={this.login}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}

                  />
                  <Button
                    type="submit"
                    id="loginButton"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign In
          </Button>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                  >
                    Register
          </button>
                </form>
              </div>

            </Grid>
            <Grid item sm={4}>

            </Grid>
          </Grid>
        </div>
        <div className="techniques">
          <Techniques />
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
