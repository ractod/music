import React, { useState, useEffect } from 'react';

// mui components
import { Box, Button, Fab, Typography, } from '@mui/material';

// next.js
import Head from 'next/head';
import { useRouter } from 'next/router';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@reduxmodals/actions';

// components
import Banner from '@components/common/Banner';
import HorizontalSongCard from '@components/common/HorizontalSongCard';
import Loading from '@components/common/Loading';
import Authorization from '@components/auth/Authorization';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderClosed, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import EmptySong from '@components/common/EmptySong';

const SinglePlaylistPage = () => {

    const router = useRouter()
    const { playlists, userStatus } = useSelector(store => store.authState)
    const dispatch = useDispatch()

    const [playlist, setPlaylist] = useState(null)
    
    const openHandler = () => dispatch(openModal("removePlaylistModal", { playlistId: playlist._id }) )

    useEffect(() => {
        const [foundPlaylist] = playlists.filter(playlist => playlist._id == router.query.playlistId)
        if(foundPlaylist) {
            setPlaylist(foundPlaylist)
        } else if (!foundPlaylist && userStatus == "authorized") {
            router.push("/404")
        }
    }, [userStatus])

    if(userStatus == "loading") return <Loading />

    if(playlist) return (
        <>
            <Head>
                <title> Playlist </title>
            </Head>

            <Authorization>
                <Banner title={`${playlist?.name} Playlist`} bgColor="from-page-playlist" />

                <section>
                    <Box className="flex flex-col gap-5 sm:flex-row sm:items-end">
                        {/* playlist info part */}
                        <Box className="relative w-[200px] h-[200px] self-center flex flex-col items-center justify-center gap-y-1 p-2 bg-gradient-to-br from-primary to-secondary text-white rounded-xl">
                            <FontAwesomeIcon icon={faFolderClosed} size='4x' />
                            <Typography className="font-medium"> { playlist?.songs.length } songs </Typography>
                        </Box>
                        {/* buttons part */}
                        <Box className="flex-auto flex items-start justify-between gap-x-3">
                            {
                                playlist?.songs.length &&
                                <Fab color="primary" size="large">
                                    <FontAwesomeIcon icon={faPlay} size="xl" />
                                </Fab>
                            }
                            <Button onClick={openHandler} variant='contained' color="red" className="text-white mt-3" endIcon={<FontAwesomeIcon icon={faTrash} />}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </section>

                <section className="section-mt">
                    {
                        
                        playlist?.songs.length ? 
                        playlist?.songs.reverse().map((song, index) => <HorizontalSongCard key={song._id} songData={song} rank={index} />) :
                        <EmptySong /> 
                    }
                </section>
            </Authorization>
        </>
    );
};

export default SinglePlaylistPage;

