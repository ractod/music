import React from 'react';

// next.js
import Head from 'next/head';
import Image from 'next/image';

// components
import Banner from '@components/common/Banner';
import HorizontalSongCard from '@components/common/HorizontalSongCard';

// mui components
import { Box, Typography } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

// image
import testImg from "assets/images/test2.jpg"

const songs = [1,2,3,4,5,6,7,8,9]

const SingerPage = () => {
    return (
        <>
            <Head>
                <title> Singer </title>
            </Head>

            {/* section margin is for ignoring the main tag padding */}
            <section className="w-full h-[350px] flex items-center -mt-3 md:-mt-6">
                {/* singer info */}
                <Box className="w-full flex flex-col sm:flex-row items-center sm:items-end gap-5">
                    <Box className="relative w-[200px] h-[200px] flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white rounded-xl">
                        <FontAwesomeIcon icon={faMicrophone} size="4x" />
                    </Box>
                    <Typography component="span" className="text-white font-semibold text-xl sm:text-2xl md:text-3xl">
                        Justin Bieber
                    </Typography>
                </Box>
                {/* image */}
                <Box className="absolute left-0 top-0 w-full h-[350px] -z-10">
                    <Image src={testImg} alt="singer cover" layout='fill' objectFit='cover' />
                </Box>
            </section>

            {/* singer's songs */}
            <section className="section-mt">
                <Typography component="span" className="title">Justin Bieber's Songs</Typography>
                <Box className="section-content-mt">
                    { songs.map(song => <HorizontalSongCard key={song} />) }
                </Box>
            </section>
        </>
    );
};

export default SingerPage;