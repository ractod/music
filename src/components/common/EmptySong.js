import React from 'react';

// mui components
import { Box, Button, Typography } from '@mui/material';

// image
import emptySongImg from "assets/images/emptySong.svg"

// next.js
import Image from 'next/image';
import Link from 'next/link';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const EmptySong = () => {
    return (
        <Box className="flex flex-col items-center">
            <Image src={emptySongImg} alt="empty song" width={500} />
            <Typography component="span" className="block text-white font-semibold text-lg sm:text-xl md:text-2xl">
                Looks Like There Is No Song in Here
            </Typography>
            <Link href="/" passHref >
                <Button variant="contained" endIcon={<FontAwesomeIcon icon={faArrowRight} />} className="mt-4">
                    Add Song
                </Button>
            </Link>
        </Box>
    );
};

export default EmptySong;