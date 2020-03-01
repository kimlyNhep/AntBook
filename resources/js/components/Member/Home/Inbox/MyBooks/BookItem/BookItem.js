import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import DetailBook from '../DetailItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PDF from '../../../../../../../../public/Files/Books/1582874763.pdf';
import axios from 'axios';

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

    const handleEditBook = (newbook) => {
        var data = new FormData();
        data.append('title',newbook.title);
        // fd.append('author',newbook.author);
        // fd.append('genre_id',newbook.genre_id);
        // fd.append('pages',newbook.pages);
        // fd.append('images',newbook.images,newbook.images.name);
        // fd.append('resource',newbook.resource,newbook.resource.name);

        // axios.put(`/api/user/Book/Update/${props.book.id}`,fd,
        // {
        //     headers: {
        //         'content-type': `multipart/form-data;`,
        //         Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
        //     }
        // }).then(response =>
        //     console.log(response.data)
        // ).catch(error => console.log(error.response));
        console.log(data);

    }

    return (
        <div
            style={{
                backgroundImage: `url(${props.book.images})`,
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
                    onClick={() => handleOpenPDF(props.book.resource)}
                >
                    Read
                </Button>
            </div>
            {viewBook && (
                <DetailBook
                    open={viewBook}
                    handleClose={handleCloseViewBook}
                    handleSave={handleEditBook}
                    item={selectedBook}
                    bId={props.book.id}
                />
            )}
        </div>
    );
}

export default BookItem;
