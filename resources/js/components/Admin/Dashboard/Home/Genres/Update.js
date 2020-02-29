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
import axios from 'axios';

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
    }
}));

function AddPopUp(props) {
    const classes = useStyles();
    const [selectGenre,setSelectedGenre] = React.useState('');
    const [genreList, setGenreList] = React.useState([]);

    const handleTitleChange = (event) => {
        props.setGenre({...props.genre,title: event.target.value});
    }

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    }

    useEffect(() => {
        axios.get('/api/user/genre/all',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => setGenreList(response.data.genres)
        ).catch(error =>  console.log(error.response));
    },[]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    Edit <FontAwesomeIcon icon={faBook} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                            <FormControl className={classes.formControl}>
                                <InputLabel id='select-genre-label'>
                                    Genre
                                </InputLabel>
                                <Select
                                    labelId='select-genre-label'
                                    id='select-genre'
                                    value={selectGenre}
                                    onChange={event => handleGenreChange(event)}
                                >
                                    {genreList.map(genre =>
                                        <MenuItem value={genre.id} key={genre.title}>
                                            {genre.title}
                                        </MenuItem>)}
                                </Select>
                            </FormControl>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='title'
                                label='new Title'
                                type='text'
                                fullWidth
                                value={props.genre.title}
                                onChange={event => handleTitleChange(event)}
                            />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={() => props.handleSave(selectGenre)} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPopUp;
