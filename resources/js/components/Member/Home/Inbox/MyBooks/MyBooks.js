import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import withWidth from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import PDFUrl from '../../../../../../Assets/Files/sample.pdf';
import BookImage from '../../../../../../Assets/Images/halt-blood-prince.jpg';
import AnotherPDF from '../../../../../../Assets/Files/WPF.pdf';
import BookItem from './BookItem/BookItem';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './Books.css';
import ArrowNext from '@material-ui/icons/ArrowForwardIos';
import ArrowPrev from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import AddPopUp from './AddPopUp';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const Arrow = ({ text, className }) => {
    return className === 'arrow-prev' ? <ArrowPrev /> : <ArrowNext />;
};

const useStyles = makeStyles(theme => ({
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    actionTool: {
        color: 'rgba(255, 255, 255, 0.54)',
        width: '100%',
        cursor: 'pointer'
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#bdbdbd',
        '&:hover': {
            backgroundColor: '#e0e0e0'
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginBottom: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        },
        cursor: 'text'
    },
    paper: {
        padding: theme.spacing(2),
        userSelect: 'none'
    },
    addCard: {
        width: 180,
        height: 360,
        borderRadius: '1rem',
        border: '1px solid black',
        marginRight: '0.5rem',
        overflow: 'hidden',
        backgroundColor: '#eeeeee',
        position: 'relative'
    },
    addIcons: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(1)
    }
}));

function Books(props) {
    const classes = useStyles();

    const [bookData, setBookData] = React.useState([]);
    const [addBook, setAddBook] = React.useState(false);

    const handleAddBook = () => {
        setAddBook(true);
    };

    const handleAddBookClose = () => {
        setAddBook(false);
    };

    const AddCard = (
        <div className={classes.addCard}>
            <Fab
                color='primary'
                aria-label='add'
                onClick={handleAddBook}
                className={classes.addIcons}
            >
                <AddIcon />
            </Fab>
        </div>
    );

    const [searchText, setSearchText] = React.useState('');
    const [displayData, setDisplayData] = React.useState([
        AddCard,
        ...bookData
    ]);
    const [book,setBook] = React.useState({
        title: '',
        pages: 0,
        genre_id: 0,
        images: null,
        resource: null,
        author: ''
    })

    React.useEffect(() => {
        console.log('book',bookData);
        setDisplayData([AddCard,...bookData]);
    },[bookData]);

    const handleAddBookSave = () => {
        let fd = new FormData();
        fd.append('title',book.title);
        fd.append('author',book.author);
        fd.append('genre_id',book.genre_id);
        fd.append('pages',book.pages);
        fd.append('images',book.images,book.images.name);
        fd.append('resource',book.resource,book.resource.name);

        axios.post('/api/user/addBook',fd,{
            headers: {
                'content-type': `multipart/form-data;`,
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => console.log(response)
        ).catch(error => console.log(error.response));
    }

    React.useEffect(() => {
        axios.get(`/api/user/book/get/${props.gId}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => setBookData([...response.data.books]))
        .catch(error => console.log(error.response));
    },[])

    const handleSearch = event => {
        setSearchText(event.target.value);
        const newOwner = bookData.filter(
            owner =>
                owner.title
                    .toLocaleLowerCase()
                    .includes(event.target.value.toLocaleLowerCase()) ||
                owner.author
                    .toLocaleLowerCase()
                    .includes(event.target.value.toLocaleLowerCase())
        );
        setDisplayData([AddCard, ...newOwner]);
    };

    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

    // React.useEffect(() => {
    //     console.log(displayData);
    // });

    return (
        <Paper className={classes.paper}>
            <Typography variant='h5' className={classes.title}>
                {props.title}
            </Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder='Search…'
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchText}
                    onChange={event => handleSearch(event)}
                />
            </div>
            {displayData && displayData.length ? (
                <ScrollMenu
                    data={displayData.map((book, index) =>
                        index === 0 ? (
                            book
                        ) : (
                            <BookItem book={book} key={book.images} />
                        )
                    )}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    alignCenter={false}
                    hideSingleArrow={true}
                    alignOnResize={true}
                    selected={displayData[1]}
                    scrollToSelected={true}
                />
            ) : (
                <div>Not Found</div>
            )}
            {addBook && (
                <AddPopUp open={addBook} handleClose={handleAddBookClose} handleSave={handleAddBookSave} book={book} setBook={setBook}/>
            )}
        </Paper>
    );
}

export default withWidth()(Books);
