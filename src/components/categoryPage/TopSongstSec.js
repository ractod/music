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

// images
import testImg from "assets/images/test2.jpg"

// next.js
import Image from 'next/image';
import SliderButtons from '@components/common/SliderButtons';

const Slide = () => (
    <Box className="relative aspect-video flex flex-col justify-between p-3 z-10">
        {/* buttons part */}
        <Box className="flex items-center gap-x-2">
            <Box className="text-sm w-8 h-8 sm:w-[45px] sm:h-[45px] flex items-center justify-center rounded-xl bg-primary text-white cursor-pointer z-10">
                <SongOptionsMenu className="w-[50px] h-[50px]" />
            </Box>
            <Box className="w-8 h-8 sm:w-[45px] sm:h-[45px] flex items-center justify-center rounded-xl bg-primary text-white cursor-pointer z-10">
                <IconButton className="text-white text-sm sm:text-base">
                    <FontAwesomeIcon icon={faPlay} />
                </IconButton>
            </Box>
        </Box>

        {/* song info part */}
        <Box className="flex flex-col gap-y-1">
            <Typography component='span' vaiant="h5" className="text-white text-sm md:text-base font-semibold"> Eminem </Typography>
            <Typography component='span' className="text-muted text-xs md:text-sm font-semibold"> Shadow Of Song </Typography>
        </Box>

        <Image src={testImg} alt='song cover' layout='fill' className="rounded-b-md md:rounded-none md:rounded-l-md -z-10" />
    </Box>
)

const songs = [1,2,3,4,5,6,7]

const TopSongsSec = () => {

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
                {songs.map(song => (
                    <SwiperSlide key={song} >
                        <Slide />
                    </SwiperSlide>
                ))}  
            </Swiper>
        </section>
    );
};

export default TopSongsSec;