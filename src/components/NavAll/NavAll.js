import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Home from '@material-ui/icons/Home';
import Contacts from '@material-ui/icons/Contacts';
import ListAlt from '@material-ui/icons/ListAlt';
import Search from '@material-ui/icons/Search';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import Info from '@material-ui/icons/Info';

import './NavAll.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(2),
        fontSize: '20px',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        margin: 0,
    },
    logoutButton: {
        float: 'right',
        alignItems: 'right',
        marginRight: 0,
        marginTop: '20px',
        fontWeight: 600,
    },
    toolbar: {
        minHeight: 105,
    }
}));

function NavAll(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <h1 className="siteTitle" noWrap>
                                <a id="linkToHome" href="/">Job Cracker</a>
                            </h1>
                        </Grid>
                        {props.user.id ?
                            <>
                                <Grid item xs={2}>
                                    <Typography className={classes.logoutButton} variant="h6" noWrap>
                                        Hello  {props.user.username}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} id="logout">
                                    <LogOutButton />
                                </Grid>
                            </>
                            :
                            <Grid item xs={3}>
                                ''
                                </Grid>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                {props.user.id ?
                    <List>
                        <ListItem button >
                            <ListItemIcon><Home /></ListItemIcon>
                            <Link to='/home'><ListItemText primary='Home' /></Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><PlaylistAdd /></ListItemIcon>
                            <Link to='/new-job'><ListItemText primary='New Job' /></Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><ListAlt /></ListItemIcon>
                            <Link to='/job-list'><ListItemText primary='My Job List' /></Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><Search /></ListItemIcon>
                            <Link to='/search'><ListItemText primary='Search' /></Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><NotificationsActive /></ListItemIcon>
                            <Link to='/indeed'><ListItemText primary='Indeed Feed' /></Link>
                        </ListItem>
                        <Divider />
                        <ListItem button >
                            <ListItemIcon><GroupAdd /></ListItemIcon>
                            <Link to='/newcontact'><ListItemText primary='New Contact' /></Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><Contacts /></ListItemIcon>
                            <Link to='/contact'><ListItemText primary='Directory' /></Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><Info /></ListItemIcon>
                            <Link to='/about'><ListItemText primary='About' /></Link>
                        </ListItem>

                    </List>
                    :
                    <List>
                        <ListItem button >
                            <ListItemIcon><Home /></ListItemIcon>
                            <Link to='/home'><ListItemText primary='Home' /></Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon><Info /></ListItemIcon>
                            <Link to='/about'><ListItemText primary='About' /></Link>
                        </ListItem>
                    </List>
                }
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(NavAll);