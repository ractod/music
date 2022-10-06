import React from 'react';

// mui components
import { IconButton, Typography, Box } from '@mui/material';

// component
import SongOptionsMenu from './SongOptionsMenu';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// next.js
import Image from 'next/image';
import Link from 'next/link';

// * half props is for the time when two song parts are next to each other
const HorizontalSongCard = ({ songData, songData: { name, cover, singers }, rank, }) => {
    return (
        <Box className="flex flex-nowrap items-center gap-x-4 r py-0 mt-3 first:mt-0" >
            {/* rank part */}
            <Box className="w-10 hidden sm:flex items-center justify-center pr-4 border-r border-border">
                <Typography component="span" className="text-muted"> {rank < 10 ? "0" : ""}{ rank } </Typography>
            </Box>
            
            {/* play button part */}
            <Box className="flex items-center justify-center">
                <IconButton className="text-white">
                    <FontAwesomeIcon icon={faPlay} size="xs" />
                </IconButton>
            </Box>

            {/* song cover part */}
            <Box className="relative w-[40px] sm:w-[50px] h-[40px] sm:h-[50px]">
                <Image src={cover} alt="song cover" layout='responsive' className="rounded-md" width={1} height={1} />
            </Box>

            {/* song info part */}
            <Box className="min-w-[20px] flex-1">
                <Typography className="text-white text-xs sm:text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap"> { name } </Typography>
                <Box className="flex items-center">
                    {
                        singers.map((singer, index) => (
                            <Link key={singer._id} href={`/singer/${singer._id}`}>
                                <a className="text-[11px] sm:text-xs text-muted text-ellipsis mt-1" > 
                                    { singer.fullName } { index != singers.length - 1 ? "," : "" } 
                                </a>
                            </Link>
                        ))}
                </Box>
            </Box>

            {/* option part */}
            <Box>
                <SongOptionsMenu songData={songData} />
            </Box>
        </Box>
    );
};

export default HorizontalSongCard;