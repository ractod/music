import React from 'react';

// containers
import Banner from '@components/common/Banner';
import BestTrendingSec from '@components/trendingPage/BestTrendingSec';

// mui component
import { Typography } from '@mui/material';

// components
import FreeModeSlider from '@components/common/FreeModeSlider';
import VerticalSongCard from '@components/common/VerticalSongCard';

// library
import { SwiperSlide } from 'swiper/react';

// next.js
import Head from 'next/head';

const songs = [1,2,3,4,5,6,7,8]

const trending = () => {
    return (
        <>
            <Head>
                <title> Trending Songs </title>
            </Head>


            <Banner title="Trending" bgColor="from-page-trending" />
            
            {/* top trending songs section */}
            <FreeModeSlider title="Top Trending" hasMt={false}>
                { songs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard />
                    </SwiperSlide>
                )) }
            </FreeModeSlider> 

            {/* newest songs section */}
            <FreeModeSlider title="Newest Trending">
                { songs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard />
                    </SwiperSlide>
                )) }
            </FreeModeSlider>

            <BestTrendingSec />
        </>
    );
};

export default trending;