import React from 'react';

// containers
import Banner from '@components/common/Banner';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart } from '@fortawesome/free-solid-svg-icons';

// mui components
import { Fab, Typography, Box } from '@mui/material';

// components
import HorizontalSongCard from '@components/common/HorizontalSongCard';

// next.js
import Head from 'next/head';
import EmptySong from '@components/common/EmptySong';

const songs = [1,2,3,4,5,6,7,8,9,10]

const isEmpty = true

const likedsongs = () => {
    return (
        <>
            <Head>
                <title> Liked Songs </title>
            </Head>

            <Banner title="Liked Songs" bgColor="from-page-likedsongs" /> 

            <section>
                <Box className="flex flex-col gap-5 sm:flex-row sm:items-end">
                    {/* songs info part */}
                    <Box className="relative w-[200px] h-[200px] self-center flex flex-col items-center justify-center gap-y-1 p-2 bg-gradient-to-br from-primary to-secondary text-white rounded-xl">
                        <FontAwesomeIcon icon={faHeart} size='4x' />
                        <Typography className="font-medium"> 10 songs </Typography>
                    </Box>
                    {/* buttons part */}
                    {
                        !isEmpty && 
                        <Fab  color="primary" size="large">
                            <FontAwesomeIcon icon={faPlay} size="xl" />
                        </Fab>
                    }
                </Box>
            </section>

            <section className="section-mt">
                {
                    isEmpty ? 
                    <EmptySong /> :
                    songs.map(song => <HorizontalSongCard key={song} />)
                }
            </section>
        </>
    );
};

export default likedsongs;