import React from 'react';
import Grid from '@material-ui/core/Grid';
import Books from './Books/Books';

function Home() {
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Books title='Advanture' />
            </Grid>
            <Grid item xs={12}>
                <Books title='Love' />
            </Grid>
            <Grid item xs={12}>
                <Books title='Comedy' />
            </Grid>
        </React.Fragment>
    );
}

export default Home;
