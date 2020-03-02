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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyle = makeStyles(theme => ({
    gridList: {
        width: '100%',
        height: 260,
        display: 'flex',
        alignItems: 'center'
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hide: {
        display: 'none'
    },
    avatar: {
        minWidth: 200
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
    const [selectedFile, setSelectedFile] = React.useState();
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [admin,setAdmin] = React.useState({
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        username: props.user.username,
        email: props.user.email,
        profile: props.user.profile
    })

    const handleUpdateInfor = () => {
        let fd = new FormData();
        fd.append('first_name',admin.firstname);
        fd.append('last_name',admin.lastname);
        fd.append('username',admin.username);
        fd.append('email',admin.email);
        fd.append('profile',admin.profile,admin.profile.name);

        axios.post('/api/admin/Update',
            fd,
            {
                headers: {
                    'content-type': `multipart/form-data;`,
                    Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
                }
            }
        ).then(response => {
            console.log(response);
            location.reload();
        }).catch(error => console.log(error));

        props.handleClose();
    }

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

    const handleChange = prop => event => {
        setAdmin({...admin,[prop]: event.target.value});
    }

    const handlePreview = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(event.target.files[0]);
    };

    React.useEffect(() => {
        axios.get('/api/admin/info', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => {
            console.log(response);
            props.setUser({...props.user,
                    firstname: response.data.first_name,
                    lastname: response.data.last_name,
                    username: response.data.username,
                    email: response.data.email,
                    profile: response.data.profile
            });
            setImagePreviewUrl(response.data.profile);
        }).catch(error=>console.log(error));
    },[]);


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

    React.useEffect(() => {
        if (!selectedFile) {
            setImagePreviewUrl(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreviewUrl(objectUrl);
        setAdmin({...admin,
            profile: selectedFile
    });
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

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
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <GridList
                                cellHeight={180}
                                cols={1}
                                className={classes.gridList}
                            >
                                <GridListTile key={props.user.username}>
                                    <img
                                        src={imagePreviewUrl}
                                        alt={admin.username}
                                        className={classes.avatar}
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
                        </Grid>
                        <Grid item xs={8} className={classes.controls}>
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
                                    readOnly={values.nonEditableFirstname}
                                    value={admin.firstname}
                                    onChange={handleChange('firstname')}
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
                                    readOnly={values.nonEditableLastname}
                                    inputRef={inputRefLastname}
                                    value={admin.lastname}
                                    onChange={handleChange('lastname')}
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
                                    readOnly={values.nonEditableUsername}
                                    inputRef={inputRefUsername}
                                    value={admin.username}
                                    onChange={handleChange('username')}
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
                                    readOnly={values.nonEditableEmail}
                                    value={admin.email}
                                    onChange={handleChange('email')}
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
                    <Button onClick={handleUpdateInfor} color='primary'>
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
