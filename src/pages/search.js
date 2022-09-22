import React from 'react';

// mui components
import { IconButton, Box, Typography, TextField } from '@mui/material';

// components
import FreeModeSlider from '@components/common/FreeModeSlider';
import HorizontalSongCard from '@components/common/HorizontalSongCard';

// containers
import Banner from '@components/common/Banner';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SwiperSlide } from 'swiper/react';

// next.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// images
import testImg from "assets/images/test.jpg"

const singers = [1,2,3,4,5,6]
const songs = [1,2,3,4,5,6,7,8,9]

const SingerCard = () => (
    <Link href="/">
        <a className='flex flex-col items-center py-6 px-4 bg-background-light rounded-xl transition-all duration-150 ease-linear hover:bg-background-extralight'>
            <Box className="w-[90px]">
                <Image src={testImg} alt="song cover" layout="responsive" width={1} height={1} className="rounded-full" />
            </Box>
            <Typography className="w-full font-medium text-white mt-3 text-xs md:text-sm text-center whitespace-nowrap overflow-hidden text-ellipsis"> Ariana Grande</Typography>
        </a>
    </Link>
)

const search = () => {
    return (
        <>
            <Head>
                <title> Search </title>
            </Head>

            <Banner title="Search" bgColor="from-page-search" />

            {/* search input section */}
            <section className="mb-20">
                <form className="relative">
                   <TextField variant='outlined' placeholder="Search For Songs" fullWidth inputProps={{ className: "pl-14" }} />
                    <IconButton type='submit' className="absolute left-2 top-1/2 -translate-y-1/2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </IconButton>
                </form>
            </section>   

            {/* singers result section */}
            <FreeModeSlider title="Singers" spaceBetween={40}>
                { 
                    singers.map(singer => (
                        <SwiperSlide key={singer} className="w-fit">
                            <SingerCard />
                        </SwiperSlide>
                    )) 
                }
            </FreeModeSlider>

            {/* songs result section */}
            <section className="section-mt">
                <Typography component="span" className="title">Songs</Typography>
                <Box className="section-content-mt">
                    { songs.map(song => <HorizontalSongCard key={song} />) }
                </Box>
            </section>
        </>
    );
};

export default search;