import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import DetailBook from '../DetailItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    icons: { color: 'rgba(255, 255, 255, 0.54)' },
    actionTools: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function BookItem(props) {
    const classes = useStyles();
    const [viewBook, setViewBook] = React.useState(false);
    const [selectedBook, setSelectedBook] = React.useState();

    const handleViewBook = book => {
        setViewBook(true);
        setSelectedBook(book);
    };

    const handleCloseViewBook = () => {
        setViewBook(false);
        setSelectedBook(null);
    };
    const handleOpenPDF = source => {
        window.open(source);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${props.book.img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                cursor: 'text'
            }}
            className='image-list'
        >
            <div className={classes.actionTools}>
                <IconButton onClick={() => handleViewBook(props.book)}>
                    <InfoIcon className={classes.icons} />
                </IconButton>
                <Button
                    color='secondary'
                    onClick={() => handleOpenPDF(props.book.source)}
                >
                    Read
                </Button>
            </div>
            {viewBook && (
                <DetailBook
                    open={viewBook}
                    handleClose={handleCloseViewBook}
                    item={selectedBook}
                />
            )}
        </div>
    );
}

export default BookItem;
