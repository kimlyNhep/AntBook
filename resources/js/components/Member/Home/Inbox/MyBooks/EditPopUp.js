import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AttachFile from '@material-ui/icons/AttachFile';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    paper: {
        width: 180,
        height: 210,
        marginBottom: theme.spacing(1)
    },
    hide: {
        display: 'none'
    },
    preview: {
        width: 180,
        height: 210
    },
    gridList: {
        width: '100%',
        height: 260,
        display: 'flex',
        alignItems: 'center'
    },
}));

function EditPopUp(props) {
    const classes = useStyles();
    const history = useHistory();
    const [owner, setOwner] = React.useState();
    const [selectGenre, setSelectGenre] = React.useState(props.oldBook.genre_id);
    const [genreList,setGenreList] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState();
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [selectedAttachFile, setSelectedAttachFile] = React.useState(
        props.oldBook.source
    );
    const [book,setBook] = React.useState({
        id: props.bId,
        title: props.oldBook.title,
        author: props.oldBook.author,
        genre_id: props.oldBook.genre_id,
        user: props.oldBook.user,
        pages: props.oldBook.pages,
        images: null,
        resource: null
    });

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
        fd.append('id',book.id);
        fd.append('title',book.title);
        fd.append('author',book.author);
        fd.append('genre_id',book.genre_id);
        fd.append('pages',book.pages);
        if(book.images != null) fd.append('images',book.images,book.images.name);
        if(book.resource != null) fd.append('resource',book.resource,book.resource.name);

        axios.post(`/api/user/Book/Update`,fd,
        {
            headers: {
                'content-type': `multipart/form-data;`,
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => {
            console.log(response.data)

            props.handleClose();
            // location.reload();
        }).catch(error => console.log(error.response));

    }

    useEffect(() => {
        if (!selectedFile) {
            setImagePreviewUrl(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreviewUrl(objectUrl);
        setBook({...book,images: selectedFile});
        console.log('old',props.oldBook.images,'new',selectedFile.name);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (!selectedAttachFile) {
            setSelectedAttachFile(undefined);
            return;
        }

        setBook({...book,resource: selectedAttachFile});
    }, [selectedAttachFile]);

    useEffect(() => {
        axios.get('/api/user/genre/all',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => {
            setGenreList([...response.data.genres]);
        })
        .catch(error => console.log(error));
        console.log('editBook',props.oldBook)
        setImagePreviewUrl(props.oldBook.images);
    },[]);

    useEffect(() => console.log(book),[book]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    Update <FontAwesomeIcon icon={faBook} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <Grid container spacing={2}>
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
                            />
                            <TextField
                                margin='dense'
                                id='pages'
                                label='Number of Pages'
                                type='number'
                                fullWidth
                                value={book.pages}
                                onChange={handleChange('pages')}
                            />
                            <TextField
                                margin='dense'
                                id='author'
                                label='Author'
                                type='text'
                                fullWidth
                                value={book.author}
                                onChange={handleChange('author')}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel id='select-genre-label'>
                                    Genre
                                </InputLabel>
                                <Select
                                    labelId='select-genre-label'
                                    id='select-genre'
                                    value={book.genre_id}
                                    onChange={handleChange('genre_id')}
                                >
                                    {genreList.map(genre => <MenuItem value={genre.id} key={genre.title}>{genre.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                            {selectedAttachFile && (
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
                            )}
                        </Grid>
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
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color='primary'>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditPopUp;
