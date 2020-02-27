import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import withWidth from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import PDFUrl from '../../../../../../public/Files/sample.pdf';
import BookImage from '../../../../../../public/images/halt-blood-prince.jpg';
import AnotherPDF from '../../../../../../public/Files/WPF.pdf';
import BookItem from './BookItem/BookItem';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './Books.css';
import ArrowNext from '@material-ui/icons/ArrowForwardIos';
import ArrowPrev from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';

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
    title: {
        textAlign: 'center',
        margin: theme.spacing(1)
    }
}));

function Books(props) {
    const classes = useStyles();

    const [bookData, setBookData] = React.useState([
        {
            img: BookImage,
            title: 'Harry Poter',
            pages: 700,
            author: 'J.K Rolling',
            genre: 'drama',
            owner: 'kimly',
            source: PDFUrl
        },
        {
            img:
                'https://images.unsplash.com/photo-1580093969189-38893b9de487?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
            title: 'Image',
            author: 'author',
            source: AnotherPDF
        },
        {
            img:
                'https://images.unsplash.com/photo-1569289555688-dcc8113f68ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
            title: 'Image',
            author: 'author'
        },
        {
            img:
                'https://images.unsplash.com/photo-1569077218751-3e3de7800c00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
            title: 'Image',
            author: 'author'
        },
        {
            img:
                'https://images.unsplash.com/photo-1569132030134-7da0045b755b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
            title: 'Image',
            author: 'author'
        },
        {
            img:
                'https://images.unsplash.com/photo-1568288192047-cf22326a2c3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
            title: 'Image',
            author: 'author'
        }
    ]);

    const [searchText, setSearchText] = React.useState('');
    const [displayData, setDisplayData] = React.useState([...bookData]);

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
        setDisplayData([...newOwner]);
    };

    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

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
                    data={displayData.map(book => (
                        <BookItem book={book} key={book.img} />
                    ))}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    alignCenter={false}
                    hideSingleArrow={true}
                    alignOnResize={true}
                    selected={displayData[0].img}
                    scrollToSelected={true}
                />
            ) : (
                <div>Not Found</div>
            )}
        </Paper>
    );
}

export default withWidth()(Books);
