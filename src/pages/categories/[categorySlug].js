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

// next.js
import Head from 'next/head';
import { useRouter } from 'next/router';

const songs = [1,2,3,4,5,6,7,8,9]

const CategoryPage = () => {

    const { query } = useRouter()

    return (
        <>
            <Head>
                <title> Category | { query.categorySlug } </title>
            </Head>

            <Banner title={query.categorySlug} bgColor="from-page-category" />   
            
            <TopSongsSec />

            {/* newest songs part */}
            <FreeModeSlider title="Newest Songs">
                { songs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard />
                    </SwiperSlide>
                )) }
            </FreeModeSlider> 

            {/* best songs part */}
            <FreeModeSlider title="Best Songs">
                { songs.map(song => (
                    <SwiperSlide key={song} className="w-fit">
                        <VerticalSongCard />
                    </SwiperSlide>
                )) }
            </FreeModeSlider>

            <AllCategoriesSec />
        </>
    );
};

export default CategoryPage;