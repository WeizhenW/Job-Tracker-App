import React from 'react';
import { connect } from 'react-redux';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import './LogOutButton.css';


const LogOutButton = props => (
  <PowerSettingsNew
    // This button shows up in multiple locations and is styled differently
    // because it's styled differently depending on where it is used, the className
    // is passed to it from it's parents through React props
    className={props.className}
    id="logoutButton"
    fontSize='large'
    onClick={() => 
      props.dispatch({ type: 'LOGOUT' })
    }
  />
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
