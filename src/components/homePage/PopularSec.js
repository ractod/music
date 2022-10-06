import React, { useState } from 'react';

// mui components
import { Typography, Box, IconButton } from '@mui/material';

// next.js
import Image from 'next/image';
import Link from 'next/link';

// components
import SongOptionsMenu from '@components/common/SongOptionsMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// left part in slider
const ImageSlide = ({ songData, songData: { cover, name, singers } }) => (
    <Box className="group relative aspect-video md:w-[400px] lg:w-[500px] flex flex-col justify-between p-3 " >
        {/* buttons part */}
        <Box className="flex items-center gap-x-2">
            <Box className="w-10 sm:w-[45px] h-10 sm:h-[45px] flex items-center justify-center rounded-xl bg-primary text-white cursor-pointer z-10">
                <SongOptionsMenu songData={songData} className="w-[50px] h-[50px]"/>
            </Box>
            <Box className="w-10 sm:w-[45px] h-10 sm:h-[45px] flex items-center justify-center rounded-xl bg-primary text-white cursor-pointer z-10">
                <IconButton className="text-white text-sm sm:text-base">
                    <FontAwesomeIcon icon={faPlay} />
                </IconButton>
            </Box>
        </Box>

        {/* song info part */}
        <Box className="flex flex-col gap-y-1">
            <Typography component='span' className="text-white font-semibold" > { name } </Typography>
            <Box className="flex items-center">
                {
                    singers.map((singer, index) => (
                        <Link key={singer._id} href={`/singer/${singer._id}`}>
                            <a className="text-muted font-semibold"> 
                                { singer.fullName } { index != singers.length - 1 ? "," : "" } 
                            </a>
                        </Link>
                    ))
                }
            </Box>
        </Box>

        <Image src={cover} blurDataURL={cover} alt='song cover' loading='lazy' placeholder='blur' layout='fill' objectFit='cover' className="rounded-b-md md:rounded-none md:rounded-l-md -z-10" />
    </Box>
)

// right part in slider
const TextSlide = ({ songData: { name, _id, singers }, active, setCurrentSlide }) => (
    <Box 
        onClick={() => setCurrentSlide(_id)} 
        className={`h-[70px] md:h-[90px] flex flex-col justify-center gap-y-1 py-2 px-4 md:py-4 md:px-6 cursor-pointer transition-all 
        duration-150 ease-out last:border-none md:last:rounded-br-md first:rounded-t-md md:first:rounded-tr-md border-b border-border 
        ${active ? "bg-gradient-to-r from-primary to-secondary md:scale-110 md:rounded-md z-20" : "bg-background-light "}`}
    >
        <Box className="flex items-center">
            {
                singers.map((singer, index) => (
                    <Typography key={singer._id} component="span" className="text-white font-medium text-sm sm:text-base">
                        { singer.fullName } { index != singers.length - 1 ? "," : "" } 
                    </Typography>
                ))
            }
        </Box>
        <Typography component='span' className="text-muted font-medium text-xs sm:text-sm"> { name } </Typography>
    </Box>
)

const PopularSec = ({ songsData }) => {

    // current song id
    const [currentSlide, setCurrentSlide] = useState(songsData[0]._id)
    // finding current song between all songs
    const [currentSong] = songsData.filter(song => song._id == currentSlide)

    return (
        <section className="flex justify-center md:block">
            <Box className="w-full sm:w-[400px] md:w-full">
                <Typography component="span" className="title tottom">Popular</Typography>

                <Box className="flex flex-col-reverse md:flex-row items-stretch section-content-mt">
                    <ImageSlide songData={currentSong} />
                    <Box>
                        { songsData.map(song => <TextSlide key={song._id} setCurrentSlide={setCurrentSlide} songData={song} active={song._id == currentSlide} />) }
                    </Box>
                </Box>
            </Box>
        </section>
    );
};

export default PopularSec;