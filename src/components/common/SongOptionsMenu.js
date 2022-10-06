import React, { useState } from 'react';

// mui components
import { IconButton, List, ListItemIcon, ListItemText, Menu, MenuItem, Box, useTheme, useMediaQuery } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faFolderClosed, faCirclePlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutlined } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@reduxmodals/actions';
import { updateUserLikedSongs, updateUserPlaylists } from '@reduxauth/authActions';

// helper
import { notify, hasItem } from 'helpers/helpers';

const Item = ({ icon, title, onClick = null, color = null }) => (
    <MenuItem onClick={onClick} className="py-3">
        <ListItemIcon className="text-sm md:text-base" >
            <FontAwesomeIcon icon={icon} className={color ? color : "text-primary"} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ className:"text-sm md:text-sm" }}>
            {title}
        </ListItemText>
    </MenuItem>
)

const SongOptionsMenu = ({ className = "", songData }) => {

    // anchor tag for mui menu component
    const [anchorEl, setAnchorEl] = useState(false)

    const muiTheme = useTheme()
    const widthMediaMatches = useMediaQuery(muiTheme.breakpoints.down("md"))
    const touchableMediaMatches = useMediaQuery("(hover: none)")


    const { likedSongs, playlists } = useSelector(store => store.authState)
    const dispatch = useDispatch()
    
    const openPlaylistModal = () => dispatch(openModal("addPlaylistModal"))
    const openCloseMenu = event => {
        widthMediaMatches || touchableMediaMatches ?
        dispatch(openModal("songOptionModal", { songData })) :
        setAnchorEl(prevState => prevState ? null : event.currentTarget) 
    }
    const likeHandler = () => {
        axios.put(`/songs/like/${songData._id}`)
        .then(response => {
            notify("success", response.data.message)
            dispatch(updateUserLikedSongs(response.data.song))
        })
        .catch(error => notify("error", error?.response?.data?.message || "failed to connect to the server"))
    }
    // remove song from playlist
    const addToPlaylist = (playlistId) => {
        axios.put(`/playlist/addsong/${playlistId}`, { songId: songData._id })
            .then(response => {
                notify("success", response.data.message)
                dispatch(updateUserPlaylists(response.data.playlist, songData))
                console.log(response.data)
            })
            .catch((error) => notify("error", error?.response?.data?.message || "failed to connect to the server") )
    }
    
    return (
        <Box>
            {/* option button */}
            <IconButton className={`text-white text-lg sm:text-2xl ${className}`} onClick={openCloseMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical}  />
            </IconButton>

            {/* options menu part */}
            <Menu 
                open={!!anchorEl} 
                anchorEl={anchorEl || null} 
                onClose={openCloseMenu} 
                MenuListProps={{ className: "py-0 md:py-2 divide-x-2 divide-border " }} 
                PaperProps={{ className: "relative w-52 bg-background-light text-white bg-none overflow-visible" }}
            >
                <Item title={hasItem(likedSongs, songData._id) ? "UnLike" : "Like"} icon={hasItem(likedSongs, songData._id) ? faHeartSolid : faHeartOutlined} color="text-red" onClick={likeHandler} />

                <Box className="group">
                    <Item title="Add To Playlist" icon={faCirclePlus} />
                    <List className="absolute left-0 bottom-0 w-52 min-h-[180px] max-h-[180px] overflow-y-auto -translate-x-full rounded-[4px] bg-background-light hidden group-hover:block">
                        {/* add playlist button */}
                        <Item title="Add Playlist" icon={faCirclePlus} onClick={openPlaylistModal} /> 
                        {/* user's playlists */}
                        {playlists.map(playlist => (
                            <Item 
                                key={playlist._id} 
                                title={
                                    hasItem(playlist.songs, songData._id) ? 
                                    `Remove From ${playlist.name}` : 
                                    `Add To ${playlist.name}`
                                }  
                                onClick={() => addToPlaylist(playlist._id) }
                                icon={faFolderClosed} 
                            />
                        ))}
                    </List>
                </Box>
            </Menu>

        </Box>
    );
};

export default SongOptionsMenu;