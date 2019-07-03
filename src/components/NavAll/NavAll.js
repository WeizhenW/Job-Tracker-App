import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import SideBar from '../SideBar/SideBar';

class NavAll extends Component {
    render() {
        return (
            <div>
                {this.props.user.id ?
                    <SideBar />
                    :
                    <Nav />}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(NavAll);
