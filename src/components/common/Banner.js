import React from 'react';

// mui components
import { IconButton, Typography } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

// next.js
import { useRouter } from 'next/router';

const Banner = ({ title, bgColor }) => {

    const router = useRouter()

    return (
        <section className="flex flex-wrap items-center justify-between mb-16">
            <Typography component="span" variant="h3" className="text-white font-semibold text-2xl sm:text-3xl md:text-5xl"> { title } </Typography>
            <IconButton className="text-white" onClick={() => router.back()}>
                <FontAwesomeIcon icon={faLeftLong} />
            </IconButton>
            {/* backdrop part */}
            <span className={`absolute top-0 left-0 h-60 w-full bg-gradient-to-tl ${bgColor} backdrop-blur-xl -z-10`}></span>
        </section>
    );
};

export default Banner;