import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

class Techniques extends Component {


    render() {
        return (
            <Grid container spacing={4}>
                <Grid item sm={3}>
                    <img height="150px" src="/image/react.png"></img>
                </Grid>
                <Grid item sm={3}>
                    <img height="150px" src="/image/Node.js_logo.svg"></img>
                </Grid>
                <Grid item sm={3}>
                    <img height="150px" src="/image/amazon-s3.png"></img>
                </Grid>
                <Grid item sm={3}>
                    <img height="150px" src="/image/logo-redux.png"></img>
                </Grid>
            </Grid>
        );
    }
}




export default Techniques;
