import React from 'react';

// mui components
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Typography } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@reduxmodals/actions';

const DialogTransition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const AddPlaylistModal = () => {

    const { addPlaylistModal } = useSelector(store => store.modalsState)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("addPlaylistModal"))

    return (
        <Dialog
            open={addPlaylistModal.isOpen}
            TransitionComponent={DialogTransition}
            className="p-2"
            PaperProps={{ className: "w-full sm:w-[400px] m-0 rounded-md bg-background-light bg-none" }}
            onClose={closeHandler}
        >
            <DialogTitle className="text-primary">Create</DialogTitle>

            <DialogContent className="overflow-visible">
                <TextField variant="outlined" label="Enter The Name" fullWidth />
            </DialogContent>

            <DialogActions>
                <Button variant="contained">Create</Button>
                <Button variant="outlined" onClick={closeHandler}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPlaylistModal;