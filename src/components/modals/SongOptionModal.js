import React, { useState, useEffect } from 'react';

// mui components
import { Dialog, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon, DialogTitle, DialogContent, Slide } from '@mui/material';

// redux 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '@reduxmodals/actions';
import { updateUserLikedSongs } from '@reduxauth/authActions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCirclePlus, faHeart as faHeartSolid  } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutlined } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

// helper
import { notify, hasItem } from 'helpers/helpers';

const Item = ({ title, icon, color, onClick = null }) => (
    <ListItem disableGutters onClick={onClick}>
        <ListItemButton >
            <ListItemIcon>
                <FontAwesomeIcon icon={icon} size="sm" className={color} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ className: "text-sm sm:text-base" }}> { title } </ListItemText>
        </ListItemButton>
    </ListItem>
)

const DialogTransition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

DialogTransition.displayName = "DialogTransition"

const SongOptionModal = () => {
    
    const { modalsState: { songOptionModal: { isOpen, data } }, authState: { likedSongs } } = useSelector(store => store)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("songOptionModal"))
    const openHandler = () => dispatch(openModal("addToPlaylistModal", { songData: data.songData }))
    const likeHandler = () => {
        axios.put(`/songs/like/${data.songData._id}`)
        .then(response => {
            dispatch(updateUserLikedSongs(response.data.song))
            notify("success", response.data.message)
        })
        .catch(error => notify("error", error?.response?.data?.message || "failed to connect to the server"))
    }

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={DialogTransition}
            className="p-2"
            PaperProps={{ className: "w-full sm:w-[400px] m-0 rounded-md bg-background-light bg-none" }}
            onClose={closeHandler}
        >
            {/* close modal button and title */}
            <DialogTitle className='flex items-center justify-between'>
                Song Options
                <IconButton onClick={closeHandler}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
            </DialogTitle>

            {/* options part */}
            <DialogContent>
                <List className="w-full">
                    <Item title={hasItem(likedSongs, data?.songData._id) ? "UnLike" : "Like"} icon={hasItem(likedSongs, data?.songData._id) ? faHeartSolid : faHeartOutlined} color="text-red" onClick={likeHandler} />
                    <Item title="Add To Playlist" icon={faCirclePlus} color="text-primary" onClick={openHandler} />
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default SongOptionModal;

