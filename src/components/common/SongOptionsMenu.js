import React, { useState } from 'react';

// mui components
import { IconButton, List, ListItemIcon, ListItemText, Menu, MenuItem, Box, useTheme, useMediaQuery } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faFolderClosed, faCirclePlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutlined } from '@fortawesome/free-regular-svg-icons';

// redux
import { useDispatch } from 'react-redux';
import { openModal } from '@reduxmodals/actions';

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

const SongOptionsMenu = ({ isLiked, className }) => {

    // anchor tag for mui menu component
    const [anchorEl, setAnchorEl] = useState(false)
    const muiTheme = useTheme()
    const widthMediaMatches = useMediaQuery(muiTheme.breakpoints.down("md"))
    const touchAbleMediaMatches = useMediaQuery("(hover: none)")
    const dispatch = useDispatch()

    const addHandler = () => dispatch(openModal("addPlaylistModal"))

    const clickHandler = event => {
        widthMediaMatches || touchAbleMediaMatches ?
        dispatch(openModal("songOptionModal")) :
        setAnchorEl(prevState => prevState ? null : event.currentTarget) 
    }

    return (
        <Box>
            {/* option button */}
            <IconButton className={`text-white text-lg sm:text-2xl ${className}`} onClick={clickHandler}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </IconButton>

            {/* options menu part */}
            <Menu 
                open={!!anchorEl} 
                anchorEl={anchorEl} 
                onClose={clickHandler} 
                MenuListProps={{ className: "py-0 md:py-2 divide-x-2 divide-border " }} 
                PaperProps={{ className: "relative w-52 bg-background-light text-white bg-none overflow-visible" }}
            >
                <Item title={isLiked ? "UnLike" : "Like"} icon={isLiked ? faHeartSolid : faHeartOutlined} color="text-red" />

                <Box className="group">
                    <Item title="Add To Playlist" icon={faCirclePlus} />
                    <List className="absolute left-0 bottom-0 w-52 min-h-[180px] max-h-[180px] overflow-y-auto -translate-x-full rounded-[4px] bg-background-light hidden group-hover:block">
                        {/* add playlist button */}
                        <Item title="Add Playlist" icon={faCirclePlus} onClick={addHandler} /> 
                        {/* user's playlists */}
                        <Item title="sad" icon={faFolderClosed} />
                        <Item title="happy" icon={faFolderClosed} />
                       
                    </List>
                </Box>
            </Menu>

        </Box>
    );
};

export default SongOptionsMenu;