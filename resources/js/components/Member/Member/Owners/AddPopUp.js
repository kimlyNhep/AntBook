import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
    const [selectedFile, setSelectedFile] = React.useState();
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();

    const [selectedAttachFile, setSelectedAttachFile] = React.useState();

    const handlePreview = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (!selectedFile) {
            setImagePreviewUrl(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (!selectedAttachFile) {
            setSelectedAttachFile(undefined);
            return;
        }

        console.log(selectedAttachFile);
    }, [selectedAttachFile]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    <FontAwesomeIcon icon={faUserPlus} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='Firstname'
                                label='First name'
                                type='text'
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin='dense'
                                id='Lastname'
                                label='Last name'
                                type='text'
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin='dense'
                                id='Username'
                                label='Username'
                                type='text'
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin='dense'
                                id='email'
                                label='Email'
                                type='email'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Paper variant='outlined' className={classes.paper}>
                                {selectedFile && (
                                    <img
                                        id='preview'
                                        alt='profile'
                                        src={imagePreviewUrl}
                                        className={classes.preview}
                                    />
                                )}
                            </Paper>
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
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={props.handleClose} color='primary'>
                        Added
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPopUp;
