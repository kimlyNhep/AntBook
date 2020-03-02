import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginCard from './LoginCard/LoginCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import background from '../../../../Assets/Images/background.jpg';
import {Link} from 'react-router-dom';
import MsgError from '../../Snackbar/error';

const useStyles = makeStyles(theme => ({
    bgImg: {
        backgroundImage:
            `url(${background})`,
        backgroundSize: 'cover',
        [theme.breakpoints.down('md')]: {
            backgroundPosition: 'center'
        },
        filter: 'blur(5px)',
        boxSizing: 'border-box',
        display: 'block',
        left: -10,
        top: -10,
        bottom: -10,
        right: -10,
        position: 'fixed',
        margin: -10
    },
    card: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 100
    },
    loading: {
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    }
}));

function Authentication() {
    const classes = useStyles();
    const [loading,setLoading] = React.useState(false);
    const [openError,setOpenError] = React.useState(false);
    const [message,setMessage] = React.useState('');

    return (
        <div>
            <div className={classes.bgImg}></div>
             <div className={classes.card}>
                <LoginCard setLoading={setLoading} setOpenError={setOpenError} setMessage={setMessage}/>
            </div>
            {loading ?
                <div className={classes.loading}> <CircularProgress disableShrink /> </div>
            : null}
             {openError && (
                <MsgError open={openError} setOpenError={setOpenError} className={classes.loading} message={message}/>
            )}
        </div>
    );
}

export default Authentication;
