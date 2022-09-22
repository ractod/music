import React from 'react';

// mui components
import { IconButton, Typography } from '@mui/material';

// component
import SongOptionsMenu from './SongOptionsMenu';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// images
import testImg from "assets/images/test.jpg"
import Image from 'next/image';
import { Box } from '@mui/system';

// * half props is for the time when two song parts are next to each other
const HorizontalSongCard = ({ isHalf }) => {
    return (
        <Box className="flex flex-nowrap items-center gap-x-4 r py-0 mt-3 first:mt-0" >
            {/* rank part */}
            <Box className="hidden sm:flex items-center justify-center pr-4 border-r border-border">
                <Typography component="span" className="text-muted"> 01 </Typography>
            </Box>
            {/* play button part */}
            <Box className="flex items-center justify-center">
                <IconButton className="text-white">
                    <FontAwesomeIcon icon={faPlay} size="xs" />
                </IconButton>
            </Box>
            {/* song cover part */}
            <Box className="relative w-[40px] sm:w-[50px] h-[40px] sm:h-[50px]">
                <Image src={testImg} alt="song cover" layout='responsive' className="rounded-md" width={1} height={1} />
            </Box>
            {/* song info part */}
            <Box className="min-w-[20px] flex-1">
                <Typography className="text-white text-xs sm:text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap"> How To Face Big Decisions </Typography>
                <Typography className="text-[11px] sm:text-xs text-muted text-ellipsis mt-1"> Jonathan Hope </Typography>
            </Box>
            {/* time part */}
            <Box className={`hidden sm:block ${isHalf ? "md:hidden" : "block"}`}> 
                <Typography component="span" className="text-muted"> 4:52 </Typography>
            </Box>
            {/* option part */}
            <Box >
                <SongOptionsMenu />
            </Box>
        </Box>
    );
};

export default HorizontalSongCard;