import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './SideBar.css';

import LogOutButton from '../LogOutButton/LogOutButton';


class SideBar extends Component {

    drawer = (

        <div className='drawer'>
            <List>
                <Link to='/new-job'>
                    <ListItem button key={'input'}>
                        Input Job
                </ListItem>
                </Link>

                <Link to='/job-list'>
                    <ListItem button key={'myJob'}>
                        My Job List
                </ListItem>
                </Link>

                <Link to='follow-up'>
                    <ListItem button key={'followUp'}>Follow-ups</ListItem>
                </Link>

                <Link to='/dashboard'>
                    <ListItem button key={'dashboard'}>
                        Dashboard
                </ListItem>
                </Link>

                <ListItem><LogOutButton className="nav-link logoutButton"/></ListItem>

            </List>
        </div>

    );
    render() {
        return (
            <Drawer
                className='drawerPaper'
                variant="permanent"
                open
            >
                {this.drawer}
            </Drawer>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(SideBar);


