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
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

    const [values, setValues] = React.useState({
        amount: '',
        username: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        showCPassword: false
    });

    const handleChange = prop => event => {
        props.setAdmin({...props.admin,[prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowC_Password = () => {
        setValues({ ...values, showCPassword: !values.showCPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleMouseDownC_Password = event => {
        event.preventDefault();
    };

    useEffect(() => {
        if (!selectedFile) {
            setImagePreviewUrl(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreviewUrl(objectUrl);

        props.setAdmin({...props.admin,profile: selectedFile});

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
                                value={props.admin.firstname}
                                onChange={handleChange('firstname')}
                            />
                            <TextField
                                margin='dense'
                                id='Lastname'
                                label='Last name'
                                type='text'
                                fullWidth
                                value={props.admin.lastname}
                                onChange={handleChange('lastname')}
                            />
                            <TextField
                                margin='dense'
                                id='Username'
                                label='Username'
                                type='text'
                                fullWidth
                                value={props.admin.username}
                                onChange={handleChange('username')}
                            />
                            <TextField
                                margin='dense'
                                id='email'
                                label='Email'
                                type='email'
                                fullWidth
                                value={props.admin.email}
                                onChange={handleChange('email')}
                            />
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel
                        htmlFor='standard-adornment-password'
                        className={classes.inputLabel}
                    >
                        Password
                    </InputLabel>
                    <Input
                        id='standard-adornment-password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={props.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? (
                                        <Visibility
                                            className={classes.visibilityIcon}
                                        />
                                    ) : (
                                        <VisibilityOff
                                            className={classes.visibilityIcon}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputProps={{
                            className: classes.input
                        }}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel
                        htmlFor='standard-adornment-password'
                        className={classes.inputLabel}
                    >
                        re-enter
                    </InputLabel>
                    <Input
                        id='standard-adornment-password'
                        type={values.showCPassword ? 'text' : 'password'}
                        value={props.confirmed_password}
                        onChange={handleChange('confirmed_password')}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowC_Password}
                                    onMouseDown={handleMouseDownC_Password}
                                >
                                    {values.showCPassword ? (
                                        <Visibility
                                            className={classes.visibilityIcon}
                                        />
                                    ) : (
                                        <VisibilityOff
                                            className={classes.visibilityIcon}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputProps={{
                            className: classes.input
                        }}
                    />
                </FormControl>
                        </Grid>
                        <Grid item xs={4} className={classes.preview}>
                            <GridList
                                cellHeight={180}
                                cols={1}
                                className={classes.gridList}
                            >
                                <GridListTile key={props.admin.username}>
                                {selectedFile && (
                                    <img
                                        id='preview'
                                        alt='profile'
                                        src={imagePreviewUrl}
                                        // className={classes.preview}
                                    />
                                )}
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
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={props.handleSave} color='primary'>
                        Added
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddPopUp;
