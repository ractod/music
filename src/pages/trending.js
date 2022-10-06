import React from 'react';

// containers
import Banner from '@components/common/Banner';
import BestTrendingSec from '@components/trendingPage/BestTrendingSec';

// components
import FreeModeSlider from '@components/common/FreeModeSlider';
import VerticalSongCard from '@components/common/VerticalSongCard';

// library
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';

// next.js
import Head from 'next/head';

const TrendingPage = ({ songsData }) => {
    return (
        <>
            <Head>
                <title> Trending Songs </title>
            </Head>


            <Banner title="Trending" bgColor="from-page-trending" />
            
            {/* top trending songs section */}
            <FreeModeSlider title="Top Trending" hasMt={false}>
                { songsData.trendingSongs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard songData={song} />
                    </SwiperSlide>
                )) }
            </FreeModeSlider> 

            {/* newest songs section */}
            <FreeModeSlider title="Newest Trending">
                { songsData.newestSongs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard songData={song} />
                    </SwiperSlide>
                )) }
            </FreeModeSlider>

            <BestTrendingSec songsData={songsData.bestSongs} />
        </>
    );
};

export default TrendingPage;

export const getStaticProps = async () => {
    const { data } = await axios.get("/songs/trending")
    return { props: { songsData: data } }
}