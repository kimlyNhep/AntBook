import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import DetailBook from '../DetailItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditComponent from '../EditPopUp';
import DeleteComponent from '../DeleteAlert';

const useStyles = makeStyles(theme => ({
    icons: { color: 'rgba(255, 255, 255, 0.54)' },
    actionTools: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    editTools: {
        position: "absolute",
        bottom: '1%',
    }
}));

function BookItem(props) {
    const classes = useStyles();
    const [viewBook, setViewBook] = React.useState(false);
    const [selectedBook, setSelectedBook] = React.useState();
    const [openEdit,setOpenEdit] = React.useState(false);
    const [openDelete,setOpenDelete] = React.useState(false);

    const handleViewBook = book => {
        setViewBook(true);
        setSelectedBook(book);
    };

    const handleCloseViewBook = () => {
        setViewBook(false);
        // setSelectedBook(null);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    }

    const handleOpenPDF = source => {
        window.open(source);
    };

    const handleOpenEdit = book => {
        setOpenEdit(true);
        setSelectedBook(book);
    }

    const handleOpenDelete = book => {
        setOpenDelete(true);
        setSelectedBook(book);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
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
                <IconButton onClick={() => handleOpenDelete(props.book)}>
                    <DeleteIcon color='secondary'/>
                </IconButton>
            </div>
            <div className={classes.editTools}>
                <IconButton onClick={() => handleOpenEdit(props.book)}>
                    <EditIcon color='secondary'/>
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
                    item={selectedBook}
                    bId={props.book.id}
                />
            )}
            {openEdit && (
                <EditComponent
                    open={openEdit}
                    handleClose={handleCloseEdit}
                    oldBook={selectedBook}
                    bId={props.book.id}

                />
            )}
            {openDelete && (
                <DeleteComponent
                    open={openDelete}
                    handleClose={handleCloseDelete}
                    Book={selectedBook}
                    bId={props.book.id}

                />
            )}
        </div>
    );
}

export default BookItem;
