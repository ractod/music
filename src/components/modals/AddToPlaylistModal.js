import React from 'react';

// mui components
import { Box, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide, Typography } from '@mui/material';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '@reduxmodals/actions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFolderClosed, faXmark } from '@fortawesome/free-solid-svg-icons';

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

const AddToPlaylistModal = () => {

    const { addToPlaylistModal }  = useSelector(store => store.modalsState)
    
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("addToPlaylistModal"))
    const openHandler = () => dispatch(openModal("addPlaylistModal"))

    return (
        <Dialog
            open={addToPlaylistModal.isOpen}
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
                    <Item title="sad" icon={faFolderClosed} />
                    <Item title="happy" icon={faFolderClosed} />
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default AddToPlaylistModal;