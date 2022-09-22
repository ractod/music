import React from 'react';

// mui components
import { Box, Fab, Typography } from '@mui/material';

// next.js
import Image from 'next/image';

// image
import testImg from "assets/images/test.jpg"

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import SongOptionsMenu from './SongOptionsMenu';

const VerticalSongCard = () => {
    return (
        <Box className="min-w-[190px] max-w-[190px] md:min-w-[220px] md:max-w-[220px]">  
        {/* song image and play button part */}
            <Box className="group relative">  
                <Image src={testImg} alt="song cover" layout="responsive" width={1} height={1} className="rounded-md object-cover" />
                <Box className="hover-none:block hover-hover:hidden group-hover:block md:group-hover:animate-show">
                    <Fab variant="contained" color='primary' className="absolute bottom-2 right-2 w-10 md:w-14 h-10 md:h-14 text-sm md:text-2xl">
                        <FontAwesomeIcon icon={faPlay} />
                    </Fab>
                    <Box className="absolute bottom-2 left-2 w-10 md:w-14 h-10 md:h-14 bg-primary rounded-full">
                        <SongOptionsMenu className="w-10 md:w-14 h-10 md:h-14" />
                    </Box>
                </Box>
            </Box>
            {/* song info part */}
            <Typography className="font-medium text-white text-sm md:text-base mt-2 line-clamp-2">Beatiful Midness In Our Life this ios test </Typography>
            <Typography className="text-muted text-sm md:text-base mt-2 line-clamp-1">Tony Swart</Typography>      
        </Box>
    );
};

export default VerticalSongCard;