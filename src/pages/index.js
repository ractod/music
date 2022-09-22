import React from 'react';

// mui components
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Divider, Typography } from '@mui/material';

// components
import VerticalSongCard from '@components/common/VerticalSongCard';
import HorizontalSongCard from '@components/common/HorizontalSongCard';

// containers
import Banner from '@components/common/Banner';
import PopularSec from '@components/homePage/PopularSec';
import FreeModeSlider from '@components/common/FreeModeSlider';

// library
import { SwiperSlide } from 'swiper/react';

// next.js
import Head from 'next/head';

const topTrending = [1,2,3,4,5,6,7]
const newestSongs = [1,2,3,4,5]
const topSongs = [1,2,3,4,5]

const HomePage = () => {
    return (
        <>
            <Head>
                <title> Racusic </title>
            </Head>


            <Banner title="Discover" bgColor="from-page-home" />   
            
            <PopularSec />

            {/* top trending songs section */}
            <FreeModeSlider title="Top Trending" href="/trending">
                {
                    topTrending.map(song => (
                        <SwiperSlide key={song} className="w-fit">
                            <VerticalSongCard />
                        </SwiperSlide>
                    ))
                }
            </FreeModeSlider>

            <Grid container rowSpacing={7} columnSpacing={5} component="section" className="section-mt"> 
                {/* top songs part */}
                <Grid xs={12} md={6}>
                    <Typography component="span" className="title">Top Songs</Typography>
                    <Divider className="mb-2 section-content-mt" />
                    { topSongs.map(song => <HorizontalSongCard key={song} isHalf={true} />) }
                </Grid>
                {/* newest songs part */}
                <Grid xs={12} md={6}>
                    <Typography component="span" className="title">Newest Songs</Typography>
                    <Divider className="mb-2 section-content-mt" />
                    { newestSongs.map(song => <HorizontalSongCard key={song} isHalf={true} />) }
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;
