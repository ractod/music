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
import Authorization from '@components/auth/Authorization';

// redux
import { useSelector } from 'react-redux';

// next.js
import Head from 'next/head';
import EmptySong from '@components/common/EmptySong';

const LikedsongsPage = () => {

    const { likedSongs } = useSelector(store => store.authState)

    return (
        <>
            <Head>
                <title> Liked Songs </title>
            </Head>

            <Authorization>
                <Banner title="Liked Songs" bgColor="from-page-likedsongs" /> 

                <section>
                    <Box className="flex flex-col gap-5 sm:flex-row sm:items-end">
                        {/* songs info part */}
                        <Box className="relative w-[200px] h-[200px] self-center flex flex-col items-center justify-center gap-y-1 p-2 bg-gradient-to-br from-primary to-secondary text-white rounded-xl">
                            <FontAwesomeIcon icon={faHeart} size='4x' />
                            <Typography className="font-medium"> { likedSongs.length } song{ likedSongs.length > 1 && "s" } </Typography>
                        </Box>
                        {/* buttons part */}
                        {
                            likedSongs.length > 0 && 
                            <Fab  color="primary" size="large">
                                <FontAwesomeIcon icon={faPlay} size="xl" />
                            </Fab>
                        }
                    </Box>
                </section>

                <section className="section-mt">
                    {
                        likedSongs.length > 0 ? 
                        likedSongs.map((song, index) => <HorizontalSongCard key={song._id} songData={song} rank={index} />) :
                        <EmptySong /> 
                    }
                </section>
            </Authorization>
        </>
    );
};

export default LikedsongsPage;