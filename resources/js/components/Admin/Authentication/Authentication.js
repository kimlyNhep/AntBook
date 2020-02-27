import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginCard from './LoginCard/LoginCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import background from '../../../../Assets/Images/background.jpg';
import {Link} from 'react-router-dom';

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

    return (
        <div>
            <div className={classes.bgImg}></div>
             <div className={classes.card}>
                <LoginCard setLoading={setLoading}/>
            </div>
            {loading ?
                <div className={classes.loading}> <CircularProgress disableShrink /> </div>
            : null}
        </div>
    );
}

export default Authentication;
