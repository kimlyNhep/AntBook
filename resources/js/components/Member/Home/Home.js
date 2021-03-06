import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Books from './Books/Books';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: []
        }

        axios.get('/api/user/genre/all',
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => {
            this.setState({
                genres: response.data.genres
            },() => console.log(this.state.genres))
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.genres.map(genre => {
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
}

