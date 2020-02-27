import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Navbar from '../Navbar/Navbar';
import Avatar from '@material-ui/core/Avatar';
import Profile from '../../../../../Assets/Images/kanao.jpg';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collection from '@material-ui/icons/Collections';
import Account from '@material-ui/icons/AccountCircle';
import Addbox from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockOpen from '@material-ui/icons/LockOpen';
import ExitToApp from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import ProfileDetail from './ProfileDetail';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CPNAddGenre from '../Home/Genres/Add';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minWidth: 0
    },
    nested: {
        paddingLeft: theme.spacing(9)
    },
    grow: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none'
    }
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();

    const [open, setOpen] = React.useState(true);

    const [openCategory, setOpenCategory] = React.useState(true);
    const [expandAdmin, setExpandAdmin] = React.useState(true);
    const [openProfile, setOpenProfile] = React.useState(false);
    const [viewProfile, setViewProfile] = React.useState(false);
    const [addGenre,setAddGenre] = React.useState(false);

    const [user,setUser] = React.useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        profile: ''
    });

    const[genre,setGenre] = React.useState({
        title: ''
    })

    const [genreList,setGenreList] = React.useState([]);

    const handleAddGenre = () => {
        setAddGenre(!addGenre);
    }

    const handleCategory = () => {
        setOpenCategory(!openCategory);
    };

    const handleExpandAdmin = () => {
        setExpandAdmin(!expandAdmin);
    };

    const handleOpenProfile = () => {
        setOpenProfile(!openProfile);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpenCategory(false);
        setOpenProfile(false);
        setExpandAdmin(false);
    };

    const handleViewProfile = () => {
        setViewProfile(true);
    };

    const handleCloseProfile = () => {
        setViewProfile(false);
    };

    const handleSaveProfile = () => {
        axios.post('/api/admin/Update',
            {
                first_name: user.firstname,
                last_name: user.lastname,
                username: user.username,
                email: user.email
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
                }
            }
        ).then(response => {
            console.log(response);
        }).catch(error => console.log(error));

        handleCloseProfile();
    }

    const handleSaveGenre = () => {
        axios.post('/api/admin/Genre/add',
            {
                title: genre.title
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
                }
            }
        ).then(response => {
            handleLoadGenre();
        }).catch(error => console.log(error));
        handleCloseGenre();
    }

    const handleCloseGenre = () => {
        setAddGenre(false);
    }

    const handleLoadGenre = () => {
        axios.get('/api/admin/Genre/show',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
                }
            }
        ).then(response => {
            setGenreList([...response.data.genres]);
            console.log(response);
        }).catch(error => console.log(error));
    }

    const handleLogout = () => {
        axios.get('/api/admin/logout',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => history.push('/Admin/Authentication')
        ).catch(error => console.log(error));
    }

    const handleLoadProfile = () => {
        axios.get('/api/admin/info',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => setUser(
            {...user,
            firstname: response.data.first_name,
            lastname: response.data.last_name,
            username: response.data.username,
            email: response.data.email,
            profile: response.data.profile
            })
        ).catch(error => console.log(error));
    }

    React.useEffect(() => {
        handleLoadGenre();
    },[]);

    React.useEffect(()=> {
        console.log(genreList);
    },[genreList]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer
                variant='permanent'
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key='Profile' onClick={handleOpenProfile}>
                        <ListItemIcon>
                            <Avatar alt='kanao' src={Profile} />
                        </ListItemIcon>
                        <ListItemText primary='kimly' />
                        {openProfile ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <List>
                        <Collapse in={openProfile} timeout='auto' unmountOnExit>
                            <ListItem
                                button
                                key='info'
                                className={classes.nested}
                                onClick={handleViewProfile}
                            >
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary='Info' />
                            </ListItem>
                            <ListItem
                                button
                                key='Change Password'
                                className={classes.nested}
                            >
                                <ListItemIcon>
                                    <LockOpen />
                                </ListItemIcon>
                                <ListItemText primary='Password' />
                            </ListItem>
                            <ListItem
                                button
                                key='LogOut'
                                className={classes.nested}
                                onClick={handleLogout}
                            >
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary='Log Out' />
                            </ListItem>
                        </Collapse>
                    </List>
                </List>
                <Divider />
                <ListItem button onClick={handleExpandAdmin}>
                    <ListItemIcon>
                        <Account />
                    </ListItemIcon>
                    <ListItemText primary='Administrator' />
                    {expandAdmin ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <List>
                    <Collapse in={expandAdmin} timeout='auto' unmountOnExit>
                        <ListItem button key='Add' className={classes.nested}>
                            <ListItemIcon>
                                <Addbox />
                            </ListItemIcon>
                            <ListItemText primary='Add' />
                        </ListItem>
                        <ListItem
                            button
                            key='Update'
                            className={classes.nested}
                        >
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary='Update' />
                        </ListItem>
                        <ListItem
                            button
                            key='Delete'
                            className={classes.nested}
                        >
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary='Delete' />
                        </ListItem>
                    </Collapse>
                </List>
                <Divider />
                <ListItem button onClick={handleCategory}>
                    <ListItemIcon>
                        <Collection />
                    </ListItemIcon>
                    <ListItemText primary='All Genres' />
                    {openCategory ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <List>
                    <Collapse in={openCategory} timeout='auto' unmountOnExit>
                        {genreList.map((genre, index) => (
                            <ListItem
                                button
                                key={genre.title}
                                className={classes.nested}
                            >
                                <ListItemText primary={genre.title} />
                            </ListItem>
                        ))}
                    </Collapse>
                    <Divider />

                    <ListItem button key='Add' className={classes.nested} onClick={handleAddGenre}>
                        <ListItemIcon>
                            <Addbox />
                        </ListItemIcon>
                        <ListItemText primary='Add' />
                    </ListItem>
                    <ListItem button key='Update' className={classes.nested}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary='Update' />
                    </ListItem>
                    <ListItem button key='Delete' className={classes.nested}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary='Delete' />
                    </ListItem>
                </List>
            </Drawer>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.grow}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper
                                className={classes.paper}
                                style={{
                                    backgroundColor: '#673ab7',
                                    color: 'white'
                                }}
                            >
                                Administrators
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper
                                className={classes.paper}
                                style={{ backgroundColor: '#ffd740' }}
                                onClick={() => {
                                    history.push('/Admin/Member');
                                }}
                            >
                                Members
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                className={classes.paper}
                                style={{
                                    backgroundColor: '#c62828',
                                    color: 'white'
                                }}
                                onClick={() => {
                                    history.push('/Admin/Notifications');
                                }}
                            >
                                Notifications
                            </Paper>
                        </Grid>
                        {props.children}
                    </Grid>
                </div>
            </div>
            {viewProfile && (
                <ProfileDetail
                    open={openProfile}
                    handleClose={handleCloseProfile}
                    handleSave={handleSaveProfile}
                    user={user}
                    setUser={setUser}
                />
            )}
            {addGenre && (
                <CPNAddGenre
                    open={addGenre}
                    handleSave={handleSaveGenre}
                    handleClose={handleCloseGenre}
                    genre={genre}
                    setGenre={setGenre}
                />)}
        </div>
    );
}
