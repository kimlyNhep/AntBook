import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { ListItemIcon, Button, Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DetailItem from './DetailItem';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 480
    },
    inline: {
        display: 'inline'
    },
    bookProfile: {
        maxWidth: 180,
        marginRight: theme.spacing(2),
        cursor: 'pointer'
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

export default function AlignItemsList() {
    const classes = useStyles();

    const [openMore, setMore] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();
    const [books,setBooks] = React.useState([]);

    const handleMoreClick = source => {
        setSelectedItem(source);
        setMore(true);
    };

    const handleMoreClose = () => {
        setMore(false);
    };

    React.useEffect(() => {
        axios.get('/api/admin/Approve/list',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then (
            response => setBooks([...response.data.tmpbooks])
        ).catch (
            error => console.log(error.response)
        );
    },[]);

    return (
        <Grid xs={12}>
        {books.length > 0 &&
            books.map(book => (
            <List className={classes.root}>
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <img
                            src={book.images}
                            alt='book Sample'
                            className={classes.bookProfile}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={book.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Author
                                </Typography>
                                {' — ' + book.author} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Owner
                                </Typography>
                                {' — ' + book.user} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Genre
                                </Typography>
                                {' — ' + book.genre} <br />
                                <Button>Read</Button>
                            </React.Fragment>
                        }
                    />
                    <ListItemIcon>
                        <React.Fragment>
                            <Button>
                                <CheckIcon />
                            </Button>
                            <Button>
                                <ClearIcon />
                            </Button>
                        </React.Fragment>
                    </ListItemIcon>
                </ListItem>
                <Divider variant='inset' component='li' />
            </List>
            ))
        }
        {openMore && (
            <DetailItem
                open={openMore}
                handleClose={handleMoreClose}
                item={selectedItem}
            />
        )}
        </Grid>
    );
}
