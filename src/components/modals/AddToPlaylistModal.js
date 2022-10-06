import React from 'react';

// mui components
import { Box, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide, Typography } from '@mui/material';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '@reduxmodals/actions';
import { updateUserPlaylists } from '@reduxauth/authActions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFolderClosed, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// helper
import { notify, hasItem } from 'helpers/helpers';

const Item = ({ title, icon, onClick = null }) => (
    <ListItem disableGutters onClick={onClick}>
        <ListItemButton >
            <ListItemIcon>
                <FontAwesomeIcon icon={icon} className="text-primary" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ className: "text-sm sm:text-base" }}> { title } </ListItemText>
        </ListItemButton>
    </ListItem>
)

const DialogTransition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

DialogTransition.displayName = "DialogTransition"

const AddToPlaylistModal = () => {

    const { modalsState: { addToPlaylistModal: { isOpen, data } }, authState: { user, playlists } }  = useSelector(store => store)
    
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("addToPlaylistModal"))
    const openHandler = () => dispatch(openModal("addPlaylistModal"))
    const playlistRequestHandler = (playlistId) => {
        axios.put(`/playlist/addsong/${playlistId}`, { songId: data.songData._id })
            .then(response => {
                notify("success", response.data.message)
                dispatch(updateUserPlaylists(response.data.playlist, data.songData))
            })
            .catch((error) => notify("error", error?.response?.data?.message || "failed to connect to the server") )
    }

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={DialogTransition}
            className="p-2"
            PaperProps={{ className: "w-full sm:w-[400px] min-h-[400px] max-h-[400px] m-0 rounded-md bg-background-light bg-none" }}
            onClose={closeHandler}
        >
            {/* close modal button */}
            <DialogTitle className='flex items-center justify-between'>
                Choose a Playlist
                <IconButton onClick={closeHandler}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
            </DialogTitle>

            {/* playslists part */}
            <DialogContent>
                <List>
                    {/* add playlist button */}
                    <Item title="Add Playlist" icon={faCirclePlus} onClick={openHandler} />
                    {/* user's playlists */}
                    {playlists.map(playlist => (
                        <Item 
                            key={playlist._id} 
                            title={
                                hasItem(playlist.songs, data?.songData._id) ? 
                                `Remove From ${playlist.name}` : 
                                `Add To ${playlist.name}`
                            }  
                            onClick={() => playlistRequestHandler(playlist._id) }
                            icon={faFolderClosed} 
                        />
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default AddToPlaylistModal;