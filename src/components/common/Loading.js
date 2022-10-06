import React from 'react';

// image
import logo from "@assets/images/logo.png"

// mui components
import { Box } from '@mui/system';

// next.js
import Image from 'next/image';

const Loading = () => {
    return (
        <Box className="w-full flex justify-center mt-10">
            <Box className="w-20 animate-bounce">
                <Image src={logo} alt="logo" layout="responsive" width={1} height={1} />
            </Box>
        </Box>
    );
};

export default Loading;