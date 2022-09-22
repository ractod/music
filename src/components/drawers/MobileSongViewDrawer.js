import React, { useState } from 'react';

// mui components
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, useMediaQuery, useTheme } from '@mui/material';

// next.js
import Image from 'next/image';
import Link from 'next/link';

// image
import testImg from "assets/images/test.jpg"

// componets
import AudioPlayer from '@components/common/AudioPlayer';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { openModal } from '@reduxmodals/actions';

const Item = ({ title, icon, color, onClick = null }) => (
    <ListItem disableGutters onClick={onClick}>
        <ListItemButton >
            <ListItemIcon>
                <FontAwesomeIcon icon={icon} size="sm" className={color} />
            </ListItemIcon>
            <ListItemText> { title } </ListItemText>
        </ListItemButton>
    </ListItem>
)

const MobileSongViewDrawer = ({ isSongViewOpen, setIsSongViewOpen }) => {

    const muiTheme = useTheme()
    const mediaMatches = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const dispatch = useDispatch()

    const closeDrawerHandler = () => setIsSongViewOpen(false)
    const openModalHandler = () => dispatch(openModal("addToPlaylistModal"))
    
    return (
        <Drawer 
            open={isSongViewOpen && mediaMatches} 
            anchor="bottom"
            PaperProps={{ className: "relative h-screen flex flex-col items-center justify-center py-4 px-5 bg-background-dark bg-opacity-60 bg-none backdrop-blur-md" }} 
        >
            
            {/* close button */}
            <IconButton className="absolute top-4 right-5" onClick={closeDrawerHandler}>
                <FontAwesomeIcon icon={faXmark} />
            </IconButton>


            {/* song info part */}
            <Box className="w-[160px] text-center">
                <Image src={testImg} alt="song cover" layout='responsive' width={1} height={1} className='rounded-xl' />
                <Box className="mt-5">
                    <Typography component="span" className="font-medium text-white">Stay</Typography>
                    <Link href="/">
                        <a className='block mt-2 text-sm text-muted'>
                            justin biber
                        </a>
                    </Link>
                </Box>
            </Box>
            
            {/* song options button and title */}
            <List className="w-full mt-5">
                <Item title="Like" icon={faHeart} color="text-red" />
                <Item title="Add To Playlist" icon={faCirclePlus} color="text-primary" onClick={openModalHandler} />
            </List>

            <Box className="w-full mt-10">
                <AudioPlayer />
            </Box>
        </Drawer>
    );
};

export default MobileSongViewDrawer;