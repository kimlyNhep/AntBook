import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: fade(theme.palette.common.black, 0.6)
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardHeader: {
        textAlign: 'center',
        margin: 0,
        color: '#bdbdbd'
    },
    cardSubHeader: {
        textAlign: 'center',
        margin: 16,
        color: '#757575'
    },
    input: {
        color: 'white'
    },
    inputLabel: {
        color: '#757575'
    },
    visibilityIcon: {
        color: '#757575'
    },
    link: {
        textDecoration: 'none'
    }
}));

export default function LoginCard(props) {
    const classes = useStyles();
    const history = useHistory();

    const [values, setValues] = React.useState({
        amount: '',
        username: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleAdminLogin = () => {
        props.setLoading(true);
        axios.post('/api/admin/login',{
            username: values.username,
            password: values.password
        }).then(response=> {
            props.setLoading(false);
            if(response.status === 200) {
                localStorage.setItem('token', response.data.admin_token);
                history.push('/admin');
            }
        }).catch(error=> {
            props.setLoading(false);
            props.setOpenError(true);
            console.log(error.response.data.error);
            props.setMessage(error.response.data.error);
        })
    }

    return (
        <Card className={classes.card} variant='outlined' onKeyDown={event => {
            if(event.key === 'Enter') handleAdminLogin();
        }}>
            <CardContent className={classes.cardContent}>
                <Typography variant='h4' className={classes.cardHeader}>
                    Login
                </Typography>
                <Typography
                    color='textSecondary'
                    className={classes.cardSubHeader}
                >
                    As Administrator
                </Typography>
                <TextField
                    id='standard-basic'
                    label='Username'
                    autoFocus
                    autoComplete='off'
                    value={values.username}
                    onChange={handleChange('username')}
                    inputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.inputLabel
                    }}
                />
                <FormControl
                    className={clsx(classes.margin, classes.textField)}
                >
                    <InputLabel
                        htmlFor='standard-adornment-password'
                        className={classes.inputLabel}
                    >
                        Password
                    </InputLabel>
                    <Input
                        id='standard-adornment-password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
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
            </CardContent>
            <CardActions>
                <Button size='small' color='secondary'>
                    Login
                </Button>
                <Link to='/Member/Authentication' className={classes.link}>Member</Link>
            </CardActions>
        </Card>
    );
}
