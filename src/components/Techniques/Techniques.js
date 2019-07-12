import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

const styles={
    container: {
        padding: '60px',
        backgroundColor: 'white',
    }
}

class Techniques extends Component {


    render() {
        return (
            <Grid container style={styles.container} spacing={4}>
                <Grid item sm={1}>
                </Grid>
                <Grid item sm={2}>
                    <img width="200px" src="/image/react.png"></img>
                </Grid>
                <Grid item sm={2}>
                    <img width="180px" src="/image/Node.js_logo.svg"></img>
                </Grid>
                <Grid item sm={2}>
                    <img width="250px" src="/image/logo-redux.png"></img>
                </Grid>
                <Grid item sm={2}>
                    <img width="150px" src="/image/postgreSQL.png"></img>
                </Grid>
                <Grid item sm={2} style={{marginTop: '30px'}}>
                    <img width="150px" src="/image/material-ui.png"></img>
                </Grid>
                <Grid item sm={1}>
                </Grid>
                <Grid item sm={2}>
                </Grid>
                <Grid item sm={2} style={{marginTop: '20px'}}>
                    <img width="250" src="/image/amazon-s3.png"></img>
                </Grid>
                <Grid item sm={2}>
                    <img width="150px" src="/image/cheerio.jpg"></img>
                </Grid>
                <Grid item sm={2}>
                    <img width="200px" src="/image/chartjs.jpg"></img>
                </Grid>
                <Grid item sm={2} style={{marginTop: '40px'}}>
                    <img width="180px" src="/image/swal2-logo.png"></img>
                </Grid>
                <Grid item sm={2}>
                </Grid>
            </Grid>
        );
    }
}




export default Techniques;
