import React from 'react';

// containers
import Banner from '@components/common/Banner';

// mui components
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Button, Typography } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderClosed, faPlus } from '@fortawesome/free-solid-svg-icons';

// next.js
import Link from 'next/link';
import Head from 'next/head';

// redux
import { useDispatch } from 'react-redux';
import { openModal } from '@reduxmodals/actions';

const AddButton = ({ onClick }) => (
    <Grid xs={6} sm={3} lg={2} onClick={onClick}>
        <Button variant="contained" className="w-full aspect-square rounded-md">
            <FontAwesomeIcon icon={faPlus} size='3x' />
        </Button>
    </Grid>
)

const PlayListCard = () => (
    <Grid xs={6} sm={3} lg={2} >
        <Link href="/playlists/test">
            <a className="w-full">
                <Box className="flex items-center justify-center aspect-square bg-gradient-to-tr from-secondary to-primary text-white rounded-md transition-all duration-150 ease-out md:hover:-translate-y-4">
                    <FontAwesomeIcon icon={faFolderClosed} size="4x" />
                </Box>
                <Typography component="span" className="block text-muted  text-sm md:text-base font-medium mt-2"> Sad Playlist </Typography>
            </a>
        </Link>
    </Grid>
)

const playlistsData = [1,2,3,4,5,6]

const playlists = () => {

    const dispatch = useDispatch()

    const openHandler = () => dispatch(openModal("addPlaylistModal"))

    return (
        <>
            <Head>
                <title> Playlists </title>  
            </Head>

            <Banner title="Playlist" bgColor="from-page-playlist" />
            <Grid component="section" container spacing={3} className="mt-10">
                <AddButton onClick={openHandler} />
                { playlistsData.map(playlist => <PlayListCard key={playlist} />) }
            </Grid>
        </>
    );
};

export default playlists;