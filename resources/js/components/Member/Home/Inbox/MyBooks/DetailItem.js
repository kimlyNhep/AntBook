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
    const [openEdit,setOpenEdit] = React.useState(false);
    const [book,setBook] = React.useState({
        title: '',
        pages: 0,
        author: '',
        genre: '',
        owner: '',
        images: null,
        resource: null
    })
    const [selectedFile, setSelectedFile] = React.useState();
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [selectedAttachFile, setSelectedAttachFile] = React.useState();

    const handleOpenEdit = () => {
        setOpenEdit(true);
    }

    const handleChange = prop => event => {
        setBook({...book,[prop]: event.target.value});
    }

    const handlePreview = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(event.target.files[0]);
    };

    const handleAttachFile = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedAttachFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedAttachFile(event.target.files[0]);
    };

    const handleUpdate = () => {
        let fd = new FormData();
        fd.append('title',book.title);
        fd.append('author',book.author);
        fd.append('genre',book.genre);
        fd.append('pages',book.pages);
        fd.append('images',book.images,book.images.name);
        fd.append('resource',book.resource,book.resource.name);

        // // axios.put(`/api/user/Book/Update/${props.bId}`,fd,
        // // {
        // //     headers: {
        // //         'content-type': `multipart/form-data;`,
        // //         Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
        // //     }
        // // }).then(response =>
        // //     console.log(response.data)
        // // ).catch(error => console.log(error.response));
        console.log('fd',fd,'book',book);
    }

    React.useEffect(() => {
        setImagePreviewUrl(props.item.images)
        setSelectedAttachFile(props.item.resource);
        setBook({...book,
            title: props.item.title,
            pages: props.item.pages,
            author: props.item.author,
            genre: props.item.genre,
            owner: props.item.user,
            images: null,
            resource: null
        });
    },[])

    React.useEffect(() => {
        if (!selectedFile) {
            // setImagePreviewUrl(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreviewUrl(objectUrl);
        setBook({...book,images: selectedFile});
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    React.useEffect(() => {
        console.log(imagePreviewUrl);
    },[imagePreviewUrl]);

    React.useEffect(() => {
        if (!selectedAttachFile) {
            // setSelectedAttachFile(undefined);
            return;
        }
        setBook({...book,resource: selectedAttachFile});
        console.log(selectedAttachFile);
    }, [selectedAttachFile]);

    React.useEffect(() => console.log(book),[book]);

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
                            {
                                openEdit ?
                                <>
                                    <input
                                    accept='image/*'
                                    className={classes.hide}
                                    id='contained-button-file'
                                    multiple
                                    type='file'
                                    onChange={handlePreview}
                                    />
                                    <label htmlFor='contained-button-file'>
                                    <IconButton
                                        color='primary'
                                        aria-label='upload picture'
                                        component='span'
                                    >
                                        <PhotoCamera />
                                    </IconButton>
                                    </label>
                                    <input
                                    accept='application/pdf'
                                    className={classes.hide}
                                    id='contained-button-attachfile'
                                    multiple
                                    type='file'
                                    onChange={handleAttachFile}
                                    />
                            <label htmlFor='contained-button-attachfile'>
                                <IconButton
                                    color='primary'
                                    aria-label='attach file'
                                    component='span'
                                >
                                    <AttachFile />
                                </IconButton>
                            </label>
                                </> : null
                            }
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
                                onChange={handleChange('title')}
                                InputProps={{
                                    readOnly: !openEdit
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='pages'
                                label='Number of Pages'
                                type='number'
                                fullWidth
                                value={book.pages}
                                onChange={handleChange('pages')}
                                InputProps={{
                                    readOnly: !openEdit
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='author'
                                label='Author'
                                type='text'
                                fullWidth
                                value={book.author}
                                onChange={handleChange('author')}
                                InputProps={{
                                    readOnly: !openEdit
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='genre'
                                label='Genre'
                                type='text'
                                fullWidth
                                value={book.genre}
                                onChange={handleChange('genre')}
                                InputProps={{
                                    readOnly: !openEdit
                                }}
                            />
                            <TextField
                                margin='dense'
                                id='owner'
                                label='Owner'
                                type='text'
                                fullWidth
                                value={book.owner}
                                onChange={handleChange('owner')}
                                InputProps={{
                                    readOnly: !openEdit
                                }}
                            />
                            {/* {selectedAttachFile && (
                                <TextField
                                    id='file'
                                    type='text'
                                    fullWidth
                                    value={selectedAttachFile.name}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    variant='outlined'
                                />
                            )} */}
                        </Grid>
                    </Grid>
                </DialogContent>

                    {
                        openEdit ?
                    <DialogActions>
                        <Button color='primary' onClick={handleUpdate}>
                        Save
                        </Button>
                        <Button onClick={props.handleClose}>
                        Close
                        </Button>
                    </DialogActions> :
                    <DialogActions>
                        <Button onClick={handleOpenEdit}>
                        Edit
                        </Button>
                        <Button onClick={props.handleClose} color='primary'>
                        Close
                        </Button>
                    </DialogActions>
                    }
            </Dialog>
        </div>
    );
}
