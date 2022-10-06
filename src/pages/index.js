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
import axios from 'axios';

// next.js
import Head from 'next/head';

const HomePage = ({ songsData }) => {
    return (
        <>
            <Head>
                <title> Racusic </title>
            </Head>


            <Banner title="Discover" bgColor="from-page-home" />   
            
            <PopularSec songsData={songsData.popularSongs} />

            {/* top trending songs section */}
            <FreeModeSlider title="Top Trending" href="/trending">
                {
                    songsData.trendingSongs.map(song => (
                        
                        <SwiperSlide key={song._id} className="w-fit">
                            <VerticalSongCard songData={song} />
                        </SwiperSlide>
                    ))
                }
            </FreeModeSlider>

            <Grid container rowSpacing={7} columnSpacing={5} component="section" className="section-mt"> 
                {/* top songs part */}
                <Grid xs={12} md={6}>
                    <Typography component="span" className="title">Top Songs</Typography>
                    <Divider className="mb-2 section-content-mt" />
                    { songsData.topSongs.map((song, index) => <HorizontalSongCard key={song._id} songData={song} rank={index} />) }
                </Grid>
                {/* newest songs part */}
                <Grid xs={12} md={6}>
                    <Typography component="span" className="title">Newest Songs</Typography>
                    <Divider className="mb-2 section-content-mt" />
                    { songsData.newestSongs.map((song, index) => <HorizontalSongCard key={song._id} songData={song} rank={index} />) }
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;

export const getStaticProps = async context => {
    const { data } = await axios.get("/songs")
    return { props: { songsData: data } }
}