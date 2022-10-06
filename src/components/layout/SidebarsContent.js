import React from 'react';

// mui components
import { Box } from '@mui/system';
import { Divider, List, ListItem, Typography } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowTrendUp, faFolderClosed, faHeart, faMagnifyingGlass, faFire, faGuitar, faMusic, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// next.js
import Link from 'next/link';
import { useRouter } from 'next/router';

// redux 
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@reduxmodals/actions';
import { logoutUser } from '@reduxauth/authActions';

const Item = ({ icon, text, bgColor = null, active = false, href = null, onClick = null}) => (
    <ListItem className="flex items-center gap-x-4 mt-7 p-0 first:mt-0" onClick={onClick}>
        <Box 
            className={`
                w-[35px] h-[35px] flex items-center justify-center rounded-xl transition-all duration-150 ease-in 
                ${active ? `scale-110 text-white bg-primary` : "bg-background-light text-[#807f8f]"}
                ${bgColor}
            `}
        >
            <FontAwesomeIcon icon={icon} />
        </Box> 
        {
            href ?
            <Link href={href}><a className={`text-sm text-${active ? "white": "muted"} font-semibold `}> { text } </a></Link>
            :
            <Typography component="span" className={`cursor-pointer text-sm text-${active ? "white": "muted"} font-semibold `}> { text } </Typography>
        }
    </ListItem>
)

// * desktop sidebar and mobile sidebar content are same
const SidebarsContent = () => {

    const { pathname, query } = useRouter()
    const dispatch = useDispatch()
    const { modalsState, authState } = useSelector(store => store)

    const openHandler = () => dispatch(openModal("loginModal"))
    const logoutHandler = () => dispatch(logoutUser())

    return (
        <>
            <Box>
                <List>
                    {
                        authState.userStatus == "authorized" ?
                        <Item text="Logout" icon={faRightFromBracket} onClick={logoutHandler} /> :
                        <Item text="Login / Signup" icon={faUser} onClick={openHandler} active={modalsState.loginModal.isOpen || modalsState.signupModal.isOpen} /> 
                    }
                </List>
            </Box>

            <Divider className="my-5" />

            <Box>
                <Typography component="span" className="text-muted"> Menu </Typography>
                <List className="mt-5">
                    <Item text="Discover" icon={faHome} active={pathname == "/"} href="/" />
                    <Item text="Trending" icon={faArrowTrendUp} active={pathname == "/trending"} href="/trending" />
                    <Item text="Playlist" icon={faFolderClosed} active={pathname == "/playlists" || pathname == "/playlists/[playlistId]"} href="/playlists" />
                    <Item text="Liked Songs" icon={faHeart} active={pathname == "/likedsongs"} href="/likedsongs" />
                    <Item text="Search" icon={faMagnifyingGlass} active={pathname == "/search"} href="/search" />
                </List>
            </Box>
            
            <Divider className="my-5" />

            <Box>
                <Typography component="span" className="text-muted"> Category </Typography>
                <List className="mt-5">
                    <Item text="Pop" icon={faFire} active={ query.categorySlug == "pop" } href="/categories/pop" />
                    <Item text="Rock" icon={faGuitar} active={ query.categorySlug == "rock" } href="/categories/rock" />
                    <Item text="Rap" icon={faMusic} active={ query.categorySlug == "rap" } href="/categories/rap" />
                </List>
            </Box>
        </>
    );
};

export default SidebarsContent;