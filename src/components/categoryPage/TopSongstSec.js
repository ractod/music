import React, { useRef } from 'react';

// mui components
import { Box, Typography, IconButton } from '@mui/material';

// library
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Navigation } from "swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// components
import SongOptionsMenu from '@components/common/SongOptionsMenu';
import SliderButtons from '@components/common/SliderButtons';

// next.js
import Image from 'next/image';
import Link from 'next/link';

const Slide = ({ songData, songData: { name, cover, singers } }) => (
    <Box className="relative aspect-video flex flex-col justify-between p-3 z-10">

        {/* buttons part */}
        <Box className="w-8 h-8 sm:w-[45px] sm:h-[45px] flex items-center justify-center rounded-xl bg-primary text-white cursor-pointer z-10">
            <IconButton className="text-white text-sm sm:text-base">
                <FontAwesomeIcon icon={faPlay} />
            </IconButton>
        </Box>

        {/* song info part */}
        <Box className="flex flex-col gap-y-1">
            <Typography component='span' vaiant="h5" className="text-white text-sm md:text-base font-semibold"> { name } </Typography>
            <Box className="text-muted text-xs md:text-sm font-semibold">
                {
                    singers.map((singer, index) => (
                        <Link key={singer._id} href={`/singer/${singer._id}`}>
                            <a className="block text-sm md:text-base text-white text-ellipsis overflow-hidden whitespace-nowrap font-medium" > 
                                { singer.fullName } { index != singers.length - 1 ? "," : "" } 
                            </a>
                        </Link>
                    ))
                }
            </Box>
        </Box>

        <Image src={cover} blurDataURL={cover} loading="lazy" placeholder='blur' alt='song cover' layout='fill' objectFit='cover' className="rounded-b-md md:rounded-none md:rounded-l-md -z-10" />
    </Box>
)

const TopSongsSec = ({ songsData }) => {

    const nextBtn = useRef(null)
    const prevBtn = useRef(null)

    return (
        <section className="section-mt">
            <Box className="flex items-center gap-x-4">
                <Typography component="span" className="title"> Top Songs </Typography>
                <SliderButtons prevBtnRef={prevBtn} nextBtnRef={nextBtn} />
            </Box>
            <Swiper
                effect={"coverflow"}
                centeredSlides={true}
                initialSlide="1"
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevBtn.current;
                    swiper.params.navigation.nextEl = nextBtn.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                breakpoints={{
                    1200: {slidesPerView: 3},
                    900: { slidesPerView: 1.5 },
                    560: { slidesPerView: 2 },
                    0: {slidesPerView: 1.3}
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    // slideShadows: true,
                }}
                modules={[EffectCoverflow, Navigation]}
                className="section-content-mt"
            >
                {songsData.map(song => (
                    <SwiperSlide key={song._id} >
                        <Slide songData={song} />
                    </SwiperSlide>
                ))}  
            </Swiper>
        </section>
    );
};

export default TopSongsSec;