import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function AlertDialog(props) {

    const handleDelete = () => {
        axios.delete(`/api/user/Book/Delete/${props.bId}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then(response => {
            // props.loadlist();
            props.handleClose();
            location.reload();
            console.log(response.data);
        }).catch(error => console.log(error.response));
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {'Are you sure you want to delete this book?'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={props.handleClose} color='primary'>
                        Disagree
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color='primary'
                        autoFocus
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
