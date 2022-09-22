import React, { useState } from 'react';

// mui components
import { Typography, Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

// next.js
import Image from 'next/image';

// imaegs
import testImg from "assets/images/test.jpg"

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// components
import SongOptionsMenu from '@components/common/SongOptionsMenu';

const Card = () => (
    <Grid xs={12} sm={6} md={6} lg={4}>
        <Box className="flex items-center justify-between gap-x-2 rounded-md p-3 bg-background-light hover:bg-background-extralight transition-all duration-150 ease-linear ">
            {/* song info part */}
            <Box className="min-w-[100px] flex items-center gap-x-3">
                <Box className="w-[50px] md:w-[70px]">
                    <Image src={testImg} alt="song cover" layout="responsive" width={1} height={1} className="rounded-md" />
                </Box>
                <Box className="min-w-[20px]">
                    <Typography component="span" className="block text-sm md:text-base text-white text-ellipsis overflow-hidden whitespace-nowrap font-medium"> James Ton </Typography>
                    <Typography component="span" className="block text-xs md:text-sm text-muted text-ellipsis overflow-hidden whitespace-nowrap mt-1"> Brand New James </Typography>
                </Box>
            </Box>
            {/* buttons part */}
            <Box className="flex items-center gap-x-2">
                <IconButton size="small" className="text-white">
                    <FontAwesomeIcon icon={faPlay} />
                </IconButton>
                <SongOptionsMenu />
            </Box>
        </Box>   
    </Grid>
)

const songs = [1,2,3,4,5,6]

const BestTrendingSec = () => {
    return (
        <section className="section-mt">
            <Typography component="span" className="title">Best Trending</Typography>
            <Grid container spacing={4} className="section-content-mt">
                { songs.map(song => <Card key={song} />) }
            </Grid>
        </section>
    );
};

export default BestTrendingSec;