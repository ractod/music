import React from 'react';

// mui components
import { Dialog, Typography, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon, DialogTitle, DialogContent, Slide } from '@mui/material';

// redux 
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '@reduxmodals/actions';


// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHeart, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

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


const SongOptionModal = () => {

    const { songOptionModal } = useSelector(store => store.modalsState)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("songOptionModal"))
    const openHandler = () => dispatch(openModal("addToPlaylistModal"))

    return (
        <Dialog
            open={songOptionModal.isOpen}
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
                    <Item title="Like" icon={faHeart} color="text-red" />
                    <Item title="Add To Playlist" icon={faCirclePlus} color="text-primary" onClick={openHandler} />
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default SongOptionModal;

