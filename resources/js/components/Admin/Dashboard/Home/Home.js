import React from 'react';
import Grid from '@material-ui/core/Grid';
import Books from './Books/Books';
import axios from 'axios';

function Home() {

    const [genreList,setGenreList] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/user/genre/all').then(response => setGenreList([...response.data.genres])
        ).catch(error => console.log(error.response));
    },[])

    return (
        <React.Fragment>
            {
                genreList.map(genre => (
                    <Grid item xs={12} key={genre.title}>
                        <Books title={genre.title} gId={genre.id} />
                    </Grid>
                    )
                )
            }
        </React.Fragment>
    );
}

export default Home;
