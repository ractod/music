import React from 'react';

// containers
import Banner from '@components/common/Banner';
import TopSongsSec from '@components/categoryPage/TopSongstSec';

// mui components
import AllCategoriesSec from '@components/categoryPage/AllCategoriesSec';

// component
import VerticalSongCard from '@components/common/VerticalSongCard';
import FreeModeSlider from '@components/common/FreeModeSlider';

// library
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';

// next.js
import Head from 'next/head';
import { useRouter } from 'next/router';

const CategoryPage = ({ songsData }) => {

    const { query } = useRouter() 

    return (
        <>
            <Head>
                <title> Category | { query.categorySlug } </title>
            </Head>

            <Banner title={query.categorySlug} bgColor="from-page-category" />   
            
            <TopSongsSec songsData={songsData.topSongs} />

            {/* newest songs part */}
            <FreeModeSlider title="Newest Songs">
                { songsData.newestSongs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard songData={song} />
                    </SwiperSlide>
                )) }
            </FreeModeSlider> 

            {/* best songs part */}
            <FreeModeSlider title="Best Songs">
                { songsData.bestSongs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard songData={song} />
                    </SwiperSlide>
                )) }
            </FreeModeSlider>

            <AllCategoriesSec />
        </>
    );
};

export default CategoryPage;

export const getStaticPaths = () => {
    const paths = [
        { params: { categorySlug: "rock" } },
        { params: { categorySlug: "pop" } },
        { params: { categorySlug: "rap" } },
    ]

    return { paths, fallback: false }
}

export const getStaticProps = async context => {
    const { data } = await axios.get(`/songs/category/${context.params.categorySlug}`)
    return { props: { songsData: data } }
}