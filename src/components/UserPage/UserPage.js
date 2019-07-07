import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import FollowUp from '../FollowUp/FollowUp';
import DonutChart from '../DonutChart/DonutChart';
import Grid from '@material-ui/core/Grid';
import BarChart from '../BarChart/BarChart';

const styles = {
//   paper: {
//     width: '80%',
//     margin: '10px auto',
//     padding: '100px',
//     paddingTop: '20px',
// },
}
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <div>
    
    {/* <p>Your ID is: {props.user.id}</p> */}
    {/* <LogOutButton className="log-in" /> */}
    <Grid container spacing={2}>
      <Grid item xs={12} sm={2}>
      <h3 id="welcome">
      Welcome, {props.user.username}!
    </h3>       
      </Grid>
      <Grid item xs={12} sm={8}>
        {/* <Paper style={styles.paper}> */}
          <FollowUp />
          <DonutChart />
          <BarChart />
        {/* </Paper> */}
      </Grid>
      <Grid item xs={12} sm={2}>
        </Grid>
      
    </Grid>

  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
