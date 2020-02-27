import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { ListItemIcon, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DetailItem from './DetailItem';

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
    }
}));

export default function AlignItemsList() {
    const classes = useStyles();
    const [openMore, setMore] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();

    const handleMoreClick = source => {
        setSelectedItem(source);
        setMore(true);
    };

    const handleMoreClose = () => {
        setMore(false);
    };

    const bookData = {
        img:
            'https://images.unsplash.com/photo-1580151820157-3f924ce005f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        title: 'Harry Poter',
        pages: 700,
        author: 'J.K Rolling',
        genre: 'drama',
        owner: 'kimly'
        // source: PDFUrl
    };

    return (
        <React.Fragment>
            <List className={classes.root}>
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <img
                            src={bookData.img}
                            alt='book Sample'
                            className={classes.bookProfile}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary='Harry Potter'
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    By
                                </Typography>
                                {' — J.K Rolling'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Owner
                                </Typography>
                                {' — Kimly'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Genre
                                </Typography>
                                {' — Drama'} <br />
                                <Button>Read</Button>
                                <Button
                                    onClick={() => handleMoreClick(bookData)}
                                >
                                    More
                                </Button>
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
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <img
                            src={bookData.img}
                            alt='book Sample'
                            className={classes.bookProfile}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary='Harry Potter'
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    By
                                </Typography>
                                {' — J.K Rolling'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Owner
                                </Typography>
                                {' — Kimly'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Genre
                                </Typography>
                                {' — Drama'} <br />
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
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <img
                            src={bookData.img}
                            alt='book Sample'
                            className={classes.bookProfile}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary='Harry Potter'
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    By
                                </Typography>
                                {' — J.K Rolling'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Owner
                                </Typography>
                                {' — Kimly'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Genre
                                </Typography>
                                {' — Drama'} <br />
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
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <img
                            src={bookData.img}
                            alt='book Sample'
                            className={classes.bookProfile}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary='Harry Potter'
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    By
                                </Typography>
                                {' — J.K Rolling'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Owner
                                </Typography>
                                {' — Kimly'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Genre
                                </Typography>
                                {' — Drama'} <br />
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
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <img
                            src={bookData.img}
                            alt='book Sample'
                            className={classes.bookProfile}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary='Harry Potter'
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    By
                                </Typography>
                                {' — J.K Rolling'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Owner
                                </Typography>
                                {' — Kimly'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Genre
                                </Typography>
                                {' — Drama'} <br />
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
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <img
                            src={bookData.img}
                            alt='book Sample'
                            className={classes.bookProfile}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary='Harry Potter'
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    By
                                </Typography>
                                {' — J.K Rolling'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Owner
                                </Typography>
                                {' — Kimly'} <br />
                                <Typography
                                    component='span'
                                    variant='body2'
                                    className={classes.inline}
                                    color='textPrimary'
                                >
                                    Genre
                                </Typography>
                                {' — Drama'} <br />
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
            {openMore && (
                <DetailItem
                    open={openMore}
                    handleClose={handleMoreClose}
                    item={selectedItem}
                />
            )}
        </React.Fragment>
    );
}
