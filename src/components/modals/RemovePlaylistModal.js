import React from 'react';

// mui components
import { Button, Dialog, Typography, Box, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material';

// redux 
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@reduxmodals/actions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DialogTransition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const RemovePlaylistModal = () => {

    const { removePlaylistModal } = useSelector(store => store.modalsState)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("removePlaylistModal"))

    return (
        <Dialog
            open={removePlaylistModal.isOpen}
            TransitionComponent={DialogTransition}
            className="p-2"
            PaperProps={{ className: "w-full sm:w-[400px] m-0 rounded-md bg-background-light bg-none" }}
            onClose={closeHandler}
        >
            <DialogTitle className="text-red"> Delete </DialogTitle>

            <DialogContent>
                <Typography className="text-white text-sm sm:text-[15px]">
                    Are You Sure You want To Delete <Typography component="span" className="text-size-inherit font-semibold">Sad</Typography> Playlist ?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="red" endIcon={<FontAwesomeIcon icon={faTrash} />}> Delete </Button>
                <Button variant="outlined" color="red" onClick={closeHandler}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemovePlaylistModal;