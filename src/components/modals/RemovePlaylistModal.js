import React, { useState } from 'react';

// mui components
import { Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material';

// redux 
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@reduxmodals/actions';
import { removeUserPlaylist } from '@reduxauth/authActions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { notify } from 'helpers/helpers';
import { LoadingButton } from '@mui/lab';

// next.js
import { useRouter } from 'next/router';

const DialogTransition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

DialogTransition.displayName = "DialogTransition"

const RemovePlaylistModal = () => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { removePlaylistModal } = useSelector(store => store.modalsState)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("removePlaylistModal"))
    const removeHandler = () => {
        setIsLoading(true)
        axios.delete(`/playlist/${removePlaylistModal.data.playlistId}`)
            .then(response => {
                setIsLoading(false)
                console.log({id: response.data.playlist._id})
                router.push("/playlists")
                dispatch(removeUserPlaylist(response.data.playlist._id))
                notify("success", response.data.message)
                closeHandler()
            })
            .catch(error => {
                setIsLoading(false)
                notify("error", error?.response?.data?.message || "failed to connect to the server")
            })
    }

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
                <LoadingButton loading={isLoading} onClick={removeHandler} variant="contained" color="red" endIcon={<FontAwesomeIcon icon={faTrash} />}> Delete </LoadingButton>
                <Button variant="outlined" color="red" onClick={closeHandler}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemovePlaylistModal;