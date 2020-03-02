import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Books from './MyBooks/MyBooks';
import axios from 'axios';

function Inbox() {

    const [genres,setGenres] = React.useState([]);

    const handleOnload = () => {
        axios.get('/api/user/genre/all',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => {
            setGenres([...response.data.genres])
        })
        .catch(error => console.log(error));
        console.log('onload');
    }

    React.useEffect(()=> {
        handleOnload();
    },[]);

    return (
        <React.Fragment>
            {
                genres.map(genre => {
                    return (
                        <Grid item xs={12} key={genre.title}>
                            <Books title={genre.title} gId={genre.id}/>
                        </Grid>
                    )
                })
            }
        </React.Fragment>
    )
}

export default Inbox;




