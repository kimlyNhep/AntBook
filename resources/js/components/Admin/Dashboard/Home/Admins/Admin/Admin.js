import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import InfoIcon from '@material-ui/icons/Info';
import DetailAdmin from './DetailItem';
import axios from 'axios';

let breakpoints = 5;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        cursor: 'text'
    },
    gridList: {
        width: '100%',
        height: '70%'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    actionTool: {
        color: 'rgba(255, 255, 255, 0.54)',
        width: '100%',
        cursor: 'pointer'
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#bdbdbd',
        '&:hover': {
            backgroundColor: '#e0e0e0'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginBottom: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    preview: {}
}));

function Admin() {
    const classes = useStyles();

    const [Open, setOpen] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [viewProfile, setViewProfile] = React.useState(false);
    const [selectedProfile, setSelectedProfile] = React.useState();
    const [ownerList, setOwner] = React.useState([]);

    const [user,setUser] = React.useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmed_password: '',
        profile: null
    });

    const [displayData, setDisplayData] = React.useState([]);

    const handleViewProfile = profile => {
        setViewProfile(true);
        setSelectedProfile(profile);
    };

    const handleCloseViewProfile = () => {
        setViewProfile(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUser({...user,
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            confirmed_password: '',
            profile: null
        });
        setOpen(false);
    };

    const handleSearch = event => {
        setSearchText(event.target.value);
        const newOwner = ownerList.filter(owner =>
            owner.username
                .toLocaleLowerCase()
                .includes(event.target.value.toLocaleLowerCase())
        );
        setDisplayData([...newOwner]);
        console.log('newOwner', newOwner);
    };

    const handleOnLoad = () => {
        axios.get('/api/admin/all',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
                }
            }
        ).then(response => {
            setOwner([...response.data.admins]);
        }).catch(error => console.log(error.response));
    }

    useEffect(() => {
        handleOnLoad();
    },[]);

    useEffect(() => {
        setDisplayData([...ownerList]);
        console.log('OwnerList', ownerList);
    }, [ownerList]);

    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder='Search…'
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchText}
                    onChange={event => handleSearch(event)}
                />
            </div>
            <GridList
                cellHeight={90}
                cols={breakpoints}
                className={classes.gridList}
            >
                {/* <GridListTile
                    key='Subheader'
                    cols={1}
                    style={{ height: 'auto' }}
                >
                    <ListSubheader component='div'>Admins</ListSubheader>
                    <IconButton onClick={handleClickOpen}>
                        <AddIcon />
                    </IconButton>
                </GridListTile> */}
                {displayData.map(tile => (
                    <GridListTile key={tile.username} rows={2}>
                        <img src={tile.profile} alt={tile.username} />
                        <GridListTileBar title={tile.username} />
                        <GridListTileBar
                            titlePosition='top'
                            className={classes.titleBar}
                            onClick={() => handleViewProfile(tile)}
                            actionIcon={
                                <div className={classes.actionTool}>
                                    <InfoIcon />
                                </div>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
            {viewProfile && (
                <DetailAdmin
                    open={viewProfile}
                    handleClose={handleCloseViewProfile}
                    item={selectedProfile}
                />
            )}
        </div>
    );
}

export default Admin;
