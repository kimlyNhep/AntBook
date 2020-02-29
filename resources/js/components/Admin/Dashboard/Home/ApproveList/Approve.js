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
import PDF from '../../../../../../Assets/Files/sample.pdf';

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

    const handleReadBook = (resource) => {
        window.open(resource);
    }

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

    const handleApproveBooks = (book,_id) => {

        axios.put(`/api/admin/Book/approved/${_id}`,book,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(
            response => console.log(response.data)
        ).catch(error => console.log(error.response));
        // console.log('file:',file,'image:',image);
    }

    return (
        <Grid item xs={12}>
        {books.length > 0 &&
            books.map(book => (
            <List className={classes.root} key={book.title}>
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
                                <Button onClick={() => handleReadBook(book.resource)}>Read</Button>
                                <Button onClick={() => handleMoreClick(book)}><InfoIcon/></Button>
                            </React.Fragment>
                        }
                    />
                    <ListItemIcon>
                        <React.Fragment>
                            <Button onClick={() => handleApproveBooks(book,book.id)}>
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
