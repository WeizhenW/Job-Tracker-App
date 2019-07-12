import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import NavAll from '../NavAll/NavAll';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import InputJob from '../InputJob/InputJob';
import MyJobList from '../MyJobList/MyJobList';
import Search from '../Search/Search';
import JobDetail from '../JobDetail/JobDetail';
import EditDetail from '../EditDetail/EditDetail';
import NewJobList from '../NewJobList/NewJobList';
import AppliedJobList from '../AppliedJobList/AppliedJobList';
import WebScraping from '../WebScraping/WebScraping';
import Contact from '../Contact/Contact';
import ContactDisplay from '../ContactDisplay/ContactDisplay';

import './App.css';
import LogOutButton from '../LogOutButton/LogOutButton';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const ourTheme = createMuiTheme({
  palette: { 
    primary: {
      light: '#5AB5D1',
      main: '#008CB8',
    },
    secondary: {
      main: '#FC574E', 
    }
    // error: red,
  }

})

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <MuiThemeProvider theme={ourTheme}>

      <Router>
          <NavAll />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />

            {/* input job page */}
            <ProtectedRoute
              exact
              path="/new-job"
              component={InputJob}
            />

            {/* job list page */}
            <ProtectedRoute
              exact
              path="/job-list"
              component={MyJobList}
            />

            {/* to apply job list page */}
            <ProtectedRoute
              exact
              path="/job-list/to-apply"
              component={NewJobList}
            />

            {/* applied job list page */}
            <ProtectedRoute
              exact
              path="/job-list/applied"
              component={AppliedJobList}
            />

            {/* scraping */}
            <ProtectedRoute
              exact
              path="/indeed"
              component={WebScraping}
            />

            {/* dashboard page */}
            <ProtectedRoute
              exact
              path="/search"
              component={Search}
            />

            {/* job detail page */}
            <ProtectedRoute
              exact
              path="/job-list/detail/:id"
              component={JobDetail}
            />  
            
            {/* edit detail page */}
            <ProtectedRoute
              exact
              path="/job-list/edit/:id"
              component={EditDetail}
            />

            {/* edit detail page */}
            <ProtectedRoute
              exact
              path="/logout"
              component={LogOutButton}
            />

            {/* contact page */}
            <ProtectedRoute
              exact
              path="/newcontact"
              component={Contact}
            />

            {/* contact page */}
            <ProtectedRoute
              exact
              path="/contact"
              component={ContactDisplay}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
      </Router>
      </MuiThemeProvider>
  )}
}


const mapReduxStateToProps = reduxState => ({
  reduxState,
})
export default connect(mapReduxStateToProps)(App);
