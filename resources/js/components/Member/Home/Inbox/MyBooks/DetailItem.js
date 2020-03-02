import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import EditComponent from './EditPopUp';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AttachFile from '@material-ui/icons/AttachFile';

const useStyle = makeStyles(theme => ({
    preview: {
        width: 180,
        height: 260
    },
    gridList: {
        width: '100%',
        height: 260,
        display: 'flex',
        alignItems: 'center'
    },
    hide: {
        display: 'none'
    }
}));

export default function DetailItem(props) {
    const classes = useStyle();
    const [selectedFile, setSelectedFile] = React.useState();
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [selectedAttachFile, setSelectedAttachFile] = React.useState();
    const [book,setBook] = React.useState({
        title: '',
        pages: 0,
        author: '',
        genre: '',
        owner: '',
        images: null,
        resource: null
    })

    React.useEffect(() => {
        setImagePreviewUrl(props.item.images)
        setSelectedAttachFile(props.item.resource);
        setBook({...book,
            title: props.item.title,
            pages: props.item.pages,
            author: props.item.author,
            genre: props.item.genre,
            owner: props.item.user,
            images: props.item.images,
            resource: props.item.resource
        });
    },[]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{'Detail'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <GridList
                                cellHeight={180}
                                cols={1}
                                className={classes.gridList}
                            >
                                <GridListTile key={book.title}>
                                    <img
                                        src={imagePreviewUrl}
                                        alt={book.title}
                                    />
                                </GridListTile>
                            </GridList>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='title'
                                label='Title'
                                type='text'
                                fullWidth
                                value={book.title}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='pages'
                                label='Number of Pages'
                                type='number'
                                fullWidth
                                value={book.pages}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='author'
                                label='Author'
                                type='text'
                                fullWidth
                                value={book.author}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='genre'
                                label='Genre'
                                type='text'
                                fullWidth
                                value={book.genre}

                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='owner'
                                label='Owner'
                                type='text'
                                fullWidth
                                value={book.owner}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose}>
                        Close
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}
