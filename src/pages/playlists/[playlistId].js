import React from 'react';

// mui components
import { Box, Button, Fab, Typography, } from '@mui/material';

// next.js
import Head from 'next/head';

// redux
import { useDispatch } from 'react-redux';
import { openModal } from '@reduxmodals/actions';

// components
import Banner from '@components/common/Banner';
import HorizontalSongCard from '@components/common/HorizontalSongCard';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderClosed, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import EmptySong from '@components/common/EmptySong';


const playlistSongs = [1,2,3,4,5,6,7,8,9]

const isEmpty = true

const SinglePlaylistPage = () => {

    const dispatch = useDispatch()

    const openHandler = () => dispatch(openModal("removePlaylistModal"))

    return (
        <>
            <Head>
                <title> Playlist </title>
            </Head>

            <Banner title="Sad Playlist" bgColor="from-page-playlist" />

            <section>
                <Box className="flex flex-col gap-5 sm:flex-row sm:items-end">
                    {/* playlist info part */}
                    <Box className="relative w-[200px] h-[200px] self-center flex flex-col items-center justify-center gap-y-1 p-2 bg-gradient-to-br from-primary to-secondary text-white rounded-xl">
                        <FontAwesomeIcon icon={faFolderClosed} size='4x' />
                        <Typography className="font-medium"> 10 songs </Typography>
                    </Box>
                    {/* buttons part */}
                    <Box className="flex-auto flex items-start justify-between gap-x-3">
                        <Fab  color="primary" size="large">
                            <FontAwesomeIcon icon={faPlay} size="xl" />
                        </Fab>
                        <Button onClick={openHandler} variant='contained' color="red" className="text-white mt-3" endIcon={<FontAwesomeIcon icon={faTrash} />}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </section>

            <section className="section-mt">
                {
                    isEmpty ? 
                    <EmptySong /> :
                    playlistSongs.map(song => <HorizontalSongCard key={song} />)
                }
            </section>
        </>
    );
};

export default SinglePlaylistPage;