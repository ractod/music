import React, { useState } from 'react';

// image
import testImg from "assets/images/test.jpg"
import test2Img from "assets/images/test2.jpg"

// mui components
import { Typography, Box, IconButton } from '@mui/material';

// next.js
import Image from 'next/image';

// components
import SongOptionsMenu from '@components/common/SongOptionsMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const data = [
    {
        name: "Eminem",
        description: "The Best Of Week",
        image: testImg,
        id: 1
    },
    {
        name: "Daneil",
        description: "Most Popular Song",
        image: test2Img,
        id: 2
    },
    {
        name: "Daneil",
        description: "Most Popular Song",
        image: test2Img,
        id: 3
    },
    {
        name: "Daneil",
        description: "Most Popular Song",
        image: test2Img,
        id: 4
    }
]

// left part in slider
const ImageSlide = ({ songData: { image, name, description } }) => (
    <Box className="group relative aspect-video md:w-[400px] lg:w-[500px] flex flex-col justify-between p-3 " >
        {/* buttons part */}
        <Box className="flex items-center gap-x-2">
            <Box className="w-10 sm:w-[45px] h-10 sm:h-[45px] flex items-center justify-center rounded-xl bg-primary text-white cursor-pointer z-10">
                <SongOptionsMenu className="w-[50px] h-[50px]"/>
            </Box>
            <Box className="w-10 sm:w-[45px] h-10 sm:h-[45px] flex items-center justify-center rounded-xl bg-primary text-white cursor-pointer z-10">
                <IconButton className="text-white text-sm sm:text-base">
                    <FontAwesomeIcon icon={faPlay} />
                </IconButton>
            </Box>
        </Box>

        {/* song info part */}
        <Box className="flex flex-col gap-y-1">
            <Typography component='span' vaiant="h5" className="text-white font-semibold"> { name } </Typography>
            <Typography component='span' className="text-muted font-semibold"> { description } </Typography>
        </Box>

        <Image src={image} alt='song cover' layout='fill' className="rounded-b-md md:rounded-none md:rounded-l-md -z-10" />
    </Box>
)

// right part in slider
const TextSlide = ({ songData: { name, description, id }, active, setCurrentSlide }) => (
    <Box 
        onClick={() => setCurrentSlide(id)} 
        className={`h-[70px] md:h-[90px] flex flex-col justify-center gap-y-1 py-2 px-4 md:py-4 md:px-6 cursor-pointer transition-all 
        duration-150 ease-out last:border-none md:last:rounded-br-md first:rounded-t-md md:first:rounded-tr-md border-b border-border 
        ${active ? "bg-gradient-to-r from-primary to-secondary md:scale-110 md:rounded-md z-20" : "bg-background-light "}`}
    >
        <Typography component='span' vaiant="h6" className="text-white font-medium text-sm sm:text-base"> { name } </Typography>
        <Typography component='span' className="text-muted font-medium text-xs sm:text-sm"> { description } </Typography>
    </Box>
)

const PopularSec = () => {

    // current song id
    const [currentSlide, setCurrentSlide] = useState(1)
    // finding current song between all songs
    const [currentSong] = data.filter(song => song.id == currentSlide)

    return (
        <section className="flex justify-center md:block">
            <Box className="w-full sm:w-[400px] md:w-full">
                <Typography component="span" className="title tottom">Popular</Typography>

                <Box className="flex flex-col-reverse md:flex-row items-stretch section-content-mt">
                    <ImageSlide songData={currentSong} />
                    <Box>
                        { data.map(song => <TextSlide key={song.id} setCurrentSlide={setCurrentSlide} songData={song} active={song.id == currentSlide} />) }
                    </Box>
                </Box>
                
            </Box>
        </section>
    );
};

export default PopularSec;