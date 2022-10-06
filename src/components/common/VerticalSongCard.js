import React from 'react';

// mui components
import { Box, Fab, Typography } from '@mui/material';

// next.js
import Image from 'next/image';
import Link from 'next/link';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const VerticalSongCard = ({ songData: { name, singers, cover } }) => {
    return (
        <Box className="min-w-[190px] max-w-[190px] md:min-w-[220px] md:max-w-[220px]">  
            {/* song image and play button part */}
            <Box className="group relative">  

                <Image src={cover}  alt="song cover" loading='lazy'  layout="responsive" width={1} height={1} className="rounded-md object-cover" />

                <Fab variant="contained" color='primary' className="absolute bottom-2 right-2 w-10 md:w-14 h-10 md:h-14 text-sm md:text-2xl hover-none:block hover-hover:hidden group-hover:block md:group-hover:animate-show">
                    <FontAwesomeIcon icon={faPlay} size="sm" />
                </Fab>

            </Box>
            {/* song info part */}
            <Typography className="font-medium text-white text-sm md:text-base mt-2 line-clamp-2"> { name } </Typography>    
            <Box className="flex items-center">
                {
                    singers.map((singer, index) => (
                        <Link key={singer._id} href={`/singer/${singer._id}`}>
                            <a className="text-muted text-sm md:text-base mt-2 line-clamp-1" > 
                                { singer.fullName } { index != singers.length - 1 ? "," : "" } 
                            </a>
                        </Link>
                    ))
                }
            </Box>
        </Box>
    );
};

export default VerticalSongCard;