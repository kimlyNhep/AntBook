import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles(theme => ({
    preview: {
        width: 180,
        height: 260
    }
}));

export default function DetailItem(props) {
    const classes = useStyle();

    const inputRefFirstname = React.useRef();
    const inputRefLastname = React.useRef();
    const inputRefUsername = React.useRef();
    const inputRefEmail = React.useRef();

    const [values, setValues] = React.useState({
        nonEditableFirstname: true,
        nonEditableLastname: true,
        nonEditableUsername: true,
        nonEditableEmail: true
    });

    const handleEditableFirstname = () => {
        setValues({
            ...values,
            nonEditableFirstname: !values.nonEditableFirstname
        });
    };

    const handleEditableLastname = () => {
        setValues({
            ...values,
            nonEditableLastname: !values.nonEditableLastname
        });
    };

    const handleEditableUsername = () => {
        setValues({
            ...values,
            nonEditableUsername: !values.nonEditableUsername
        });
    };

    const handleEditableEmail = () => {
        setValues({ ...values, nonEditableEmail: !values.nonEditableEmail });
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (!values.nonEditableFirstname) inputRefFirstname.current.focus();
        }, 100);
        return () => {
            clearTimeout(timeout);
        };
    }, [values.nonEditableFirstname]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (!values.nonEditableLastname) inputRefLastname.current.focus();
        }, 100);
        return () => {
            clearTimeout(timeout);
        };
    }, [values.nonEditableLastname]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (!values.nonEditableUsername) inputRefUsername.current.focus();
        }, 100);
        return () => {
            clearTimeout(timeout);
        };
    }, [values.nonEditableUsername]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (!values.nonEditableEmail) inputRefEmail.current.focus();
        }, 100);
        return () => {
            clearTimeout(timeout);
        };
    }, [values.nonEditableEmail]);

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
                            <img
                                src=''
                                alt='Profile'
                                className={classes.preview}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl
                                className={clsx(
                                    classes.margin,
                                    classes.textField
                                )}
                            >
                                <InputLabel
                                    htmlFor='standard-adornment-first-name'
                                    className={classes.inputLabel}
                                >
                                    First name
                                </InputLabel>
                                <Input
                                    id='standard-adornment-first-name'
                                    type='text'
                                    inputRef={inputRefFirstname}
                                    disabled={values.nonEditableFirstname}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle input editable'
                                                onClick={
                                                    handleEditableFirstname
                                                }
                                            >
                                                {values.nonEditableFirstname ? (
                                                    <EditIcon />
                                                ) : (
                                                    <CloseIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl
                                className={clsx(
                                    classes.margin,
                                    classes.textField
                                )}
                            >
                                <InputLabel
                                    htmlFor='standard-adornment-first-name'
                                    className={classes.inputLabel}
                                >
                                    Last name
                                </InputLabel>
                                <Input
                                    id='standard-adornment-first-name'
                                    type='text'
                                    disabled={values.nonEditableLastname}
                                    inputRef={inputRefLastname}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle input editable'
                                                onClick={handleEditableLastname}
                                            >
                                                {values.nonEditableLastname ? (
                                                    <EditIcon />
                                                ) : (
                                                    <CloseIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl
                                className={clsx(
                                    classes.margin,
                                    classes.textField
                                )}
                            >
                                <InputLabel
                                    htmlFor='standard-adornment-first-name'
                                    className={classes.inputLabel}
                                >
                                    Username
                                </InputLabel>
                                <Input
                                    id='standard-adornment-first-name'
                                    type='text'
                                    disabled={values.nonEditableUsername}
                                    inputRef={inputRefUsername}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle input editable'
                                                onClick={handleEditableUsername}
                                            >
                                                {values.nonEditableUsername ? (
                                                    <EditIcon />
                                                ) : (
                                                    <CloseIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl
                                className={clsx(
                                    classes.margin,
                                    classes.textField
                                )}
                            >
                                <InputLabel
                                    htmlFor='standard-adornment-first-name'
                                    className={classes.inputLabel}
                                >
                                    Email
                                </InputLabel>
                                <Input
                                    id='standard-adornment-first-name'
                                    type='email'
                                    inputRef={inputRefEmail}
                                    disabled={values.nonEditableEmail}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle input editable'
                                                onClick={handleEditableEmail}
                                            >
                                                {values.nonEditableEmail ? (
                                                    <EditIcon />
                                                ) : (
                                                    <CloseIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleSave} color='primary'>
                        <SaveIcon />
                        Save
                    </Button>
                    <Button onClick={props.handleClose} color='primary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
